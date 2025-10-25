// // routes/123Loadboard.js
// const express = require("express");
// const fetch = require("node-fetch");
// const router = express.Router();

// const {
//   CLIENT_ID,
//   CLIENT_SECRET,
//   LOADBOARD_AID = "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//   FRONTEND_REDIRECT,
//   DEV_URI,
//   URI_123,
//   USER_AGENT = "GADZConnect/1.0",
// } = process.env;

// // ✅ Step 1: Redirect to 123Loadboard OAuth
// router.get("/authorize", (req, res) => {
//   const query = new URLSearchParams({
//     response_type: "code",
//     client_id: CLIENT_ID,
//     redirect_uri: DEV_URI,
//     scope: "loadsearching",
//     state: "gadz_state",
//     login_hint: USER_AGENT,
//   }).toString();

//   res.redirect(`${URI_123}/authorize?${query}`);
// });

// // ✅ Step 2: Handle callback (token exchange)
// router.get("/auth/callback", async (req, res) => {
//   const authCode = req.query.code;
//   if (!authCode) return res.status(400).send("Missing authorization code.");

//   try {
//     const tokenResp = await fetch(`${URI_123}/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": LOADBOARD_AID,
//         Authorization:
//           "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//       },
//       body: new URLSearchParams({
//         grant_type: "authorization_code",
//         code: authCode,
//         client_id: CLIENT_ID,
//         redirect_uri: DEV_URI,
//       }),
//     });

//     const tokenData = await tokenResp.json();
//     console.log("🔑 Token Data:", tokenData);

//     if (!tokenData.access_token) {
//       return res.status(400).json({ error: "Failed to retrieve access token", details: tokenData });
//     }

//     res.cookie("lb_access_token", tokenData.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       maxAge: 3600 * 1000,
//     });

//     if (tokenData.refresh_token) {
//       res.cookie("lb_refresh_token", tokenData.refresh_token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Lax",
//         maxAge: 7 * 24 * 3600 * 1000,
//       });
//     }

//     const redirectURL = `${FRONTEND_REDIRECT}?provider=123Loads&authorized=true`;
//     return res.redirect(redirectURL);
//   } catch (error) {
//     console.error("Auth callback failed:", error);
//     res.status(500).json({ error: "Auth callback failed", details: error.message });
//   }
// });

// // ✅ Step 3: Refresh access token
// router.post("/refresh-token", async (req, res) => {
//   const refresh_token = req.body.refresh_token;
//   if (!refresh_token) return res.status(400).json({ error: "Missing refresh token" });

//   try {
//     const resp = await fetch(`${URI_123}/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": LOADBOARD_AID,
//         Authorization:
//           "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//       },
//       body: new URLSearchParams({
//         grant_type: "refresh_token",
//         refresh_token,
//         client_id: CLIENT_ID,
//       }),
//     });

//     const data = await resp.json();
//     if (!data.access_token) return res.status(400).json({ error: "Failed to refresh token" });

//     res.cookie("lb_access_token", data.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       maxAge: 3600 * 1000,
//     });

//     res.json({ access_token: data.access_token, expires_in: data.expires_in });
//   } catch (error) {
//     console.error("Refresh token error:", error);
//     res.status(500).json({ error: "Refresh token failed" });
//   }
// });

// // ✅ Step 4: Load search endpoint
// router.post("/load-search", async (req, res) => {
//   const token =
//     req.headers.authorization?.replace("Bearer ", "") ||
//     req.cookies?.lb_access_token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: "Authorization token missing — please click Authorize/Connect first." });
//   }

//   try {
//     const response = await fetch(`${URI_123}/loads/search`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": LOADBOARD_AID,
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         metadata: { limit: 25, sortBy: { field: "Origin", direction: "Ascending" }, fields: "all" },
//         includeWithGreaterPickupDates: true,
//         origin: { city: req.body.originCity || "Atlanta", type: "City", radius: 100 },
//         destination: { type: "Anywhere" },
//         equipmentTypes: req.body.equipmentTypes || ["Van"],
//       }),
//     });

//     const data = await response.json();
//     if (!response.ok) return res.status(response.status).json({ error: data });
//     res.json(data);
//   } catch (error) {
//     console.error("Load search failed:", error);
//     res.status(500).json({ error: "Failed to fetch loads" });
//   }
// });

// module.exports = router;

// backend/routes/loadboard.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

/**
 * Environment variables expected:
 * - CLIENT_ID
 * - CLIENT_SECRET
 * - DEV_URI (frontend redirect / callback url)
 * - URI_123 (base 123LoadBoard API URL)
 * - USER_AGENT
 * - LOADBOARD_AID
 * - FRONTEND_REDIRECT (optional, default to frontend dashboard)
 */

/**
 * Helper: redirect user to 123LoadBoard authorization page
 */
router.get("/authorize", (req, res) => {
  const { CLIENT_ID, DEV_URI, URI_123, USER_AGENT = "gadzconnect_dev" } = process.env;

  if (!CLIENT_ID || !DEV_URI || !URI_123) {
    console.error("Missing env vars for /authorize");
    return res.status(500).send("Server misconfigured (missing OAuth env vars).");
  }

  const query = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: DEV_URI,
    scope: "loadsearching",
    state: "gadz_state", // in prod, generate random
    login_hint: USER_AGENT,
  }).toString();

  res.redirect(`${URI_123}/authorize?${query}`);
});

/**
 * OAuth callback: exchange code for access token
 */
router.get("/auth/callback", async (req, res) => {
  const {
    CLIENT_ID,
    CLIENT_SECRET,
    DEV_URI,
    URI_123,
    USER_AGENT = "gadzconnect_dev",
    LOADBOARD_AID = "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
    FRONTEND_REDIRECT = "http://localhost:3000/AvailableTable",
  } = process.env;

  try {
    const authCode = req.query.code;
    if (!authCode) return res.status(400).send("Missing authorization code.");

    // Exchange auth code for access token
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      client_id: CLIENT_ID,
      redirect_uri: DEV_URI,
    }).toString();

    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    if (!tokenData.access_token) {
      console.error("No access_token in response:", tokenData);
      return res.status(400).json({ error: "Failed to retrieve access token", details: tokenData });
    }

    // Set cookies (frontend can read if needed)
    const cookieOptions = [
      `lb_access_token=${tokenData.access_token}; Path=/;`,
      tokenData.refresh_token ? `lb_refresh_token=${tokenData.refresh_token}; Path=/;` : "",
    ].filter(Boolean).join(" ");
    res.setHeader("Set-Cookie", cookieOptions);

    // Redirect frontend with auth flag
    return res.redirect(`${FRONTEND_REDIRECT}?authorized=123`);

  } catch (err) {
    console.error("Error during auth callback:", err);
    return res.status(500).json({ error: "Callback error", details: String(err) });
  }
});

/**
 * Refresh access token
 */
router.post("/refresh-token", async (req, res) => {
  const { refresh_token } = req.body;
  const { CLIENT_ID, CLIENT_SECRET, URI_123, USER_AGENT = "gadzconnect_dev", LOADBOARD_AID } = process.env;

  const tokenToUse =
    refresh_token ||
    (req.headers.cookie && req.headers.cookie.match(/lb_refresh_token=([^;]+)/)?.[1]);

  if (!tokenToUse) return res.status(400).json({ error: "refresh_token missing" });

  try {
    const formData = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: tokenToUse,
      client_id: CLIENT_ID,
    }).toString();

    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID || "",
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    if (!tokenData.access_token)
      return res.status(400).json({ error: "Failed to refresh token", details: tokenData });

    const cookieOptions = [
      `lb_access_token=${tokenData.access_token}; Path=/;`,
      tokenData.refresh_token ? `lb_refresh_token=${tokenData.refresh_token}; Path=/;` : "",
    ].filter(Boolean).join(" ");

    res.setHeader("Set-Cookie", cookieOptions);

    return res.json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      raw: tokenData,
    });
  } catch (err) {
    console.error("Error refreshing token:", err);
    return res.status(500).json({ error: "refresh error", details: String(err) });
  }
});

/**
 * Old working hardcoded search endpoint (for testing)
 */
router.get("/load-search-test", async (req, res) => {
  try {
    const authToken = req.headers.authorization?.split(" ")[1] ||
      req.headers.cookie?.match(/lb_access_token=([^;]+)/)?.[1];
    if (!authToken) return res.status(401).send({ error: "Missing access token" });

    const hardcodedBody = {
      metadata: { limit: 10, sortBy: { field: "Origin", direction: "Ascending" }, fields: "all", type: "Regular" },
      includeWithGreaterPickupDates: true,
      origin: { states: ["IL"], city: "Chicago", radius: 100, type: "City" },
      destination: { type: "Anywhere" },
      equipmentTypes: ["Van", "Flatbed", "Reefer"],
      includeLoadsWithoutWeight: true,
      includeLoadsWithoutLength: true,
    };

    const loadResp = await fetch(`${process.env.URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "123LB-Correlation-Id": "GADZ123",
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": process.env.USER_AGENT,
        "123LB-AID": process.env.LOADBOARD_AID,
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(hardcodedBody),
    });

    const loadData = await loadResp.json();
    res.json(loadData);
  } catch (err) {
    console.error("Error fetching hardcoded loads:", err);
    res.status(500).send({ error: "Load search test failed" });
  }
});

/**
 * Primary search endpoint
 */
router.post("/search", async (req, res) => {
  const token =
    req.headers.authorization?.split(" ")[1] ||
    req.headers.cookie?.match(/lb_access_token=([^;]+)/)?.[1];

  if (!token) return res.status(400).json({ error: "Missing authorization token" });

  const { USER_AGENT = "gadzconnect_dev", LOADBOARD_AID } = process.env;

  try {
    const body = {
      metadata: {
        limit: 10,
        sortBy: { field: "Origin", direction: "Ascending" },
        fields: "all",
        type: "Regular",
      },
      ...req.body,
    };

    const response = await fetch(`${process.env.URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "123LB-Correlation-Id": "123GADZ",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("123Loadboard search responded with non-OK:", data);
      return res.status(response.status).json({ error: data || "Failed to fetch loads" });
    }

    return res.json(data);
  } catch (err) {
    console.error("Error fetching 123Loadboard search results:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
