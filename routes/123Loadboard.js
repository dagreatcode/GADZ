// routes/123Loadboard.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  LOADBOARD_AID = "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
  FRONTEND_REDIRECT,
  DEV_URI,
  URI_123,
  USER_AGENT = "GADZConnect/1.0",
} = process.env;

// ✅ Step 1: Redirect to 123Loadboard OAuth
router.get("/authorize", (req, res) => {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: DEV_URI,
    scope: "loadsearching",
    state: "gadz_state",
    login_hint: USER_AGENT,
  }).toString();

  res.redirect(`${URI_123}/authorize?${query}`);
});

// ✅ Step 2: Handle callback (token exchange)
router.get("/auth/callback", async (req, res) => {
  const authCode = req.query.code;
  if (!authCode) return res.status(400).send("Missing authorization code.");

  try {
    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization:
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authCode,
        client_id: CLIENT_ID,
        redirect_uri: DEV_URI,
      }),
    });

    const tokenData = await tokenResp.json();
    console.log("🔑 Token Data:", tokenData);

    if (!tokenData.access_token) {
      return res.status(400).json({ error: "Failed to retrieve access token", details: tokenData });
    }

    res.cookie("lb_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600 * 1000,
    });

    if (tokenData.refresh_token) {
      res.cookie("lb_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 7 * 24 * 3600 * 1000,
      });
    }

    const redirectURL = `${FRONTEND_REDIRECT}?provider=123Loads&authorized=true`;
    return res.redirect(redirectURL);
  } catch (error) {
    console.error("Auth callback failed:", error);
    res.status(500).json({ error: "Auth callback failed", details: error.message });
  }
});

// ✅ Step 3: Refresh access token
router.post("/refresh-token", async (req, res) => {
  const refresh_token = req.body.refresh_token;
  if (!refresh_token) return res.status(400).json({ error: "Missing refresh token" });

  try {
    const resp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization:
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id: CLIENT_ID,
      }),
    });

    const data = await resp.json();
    if (!data.access_token) return res.status(400).json({ error: "Failed to refresh token" });

    res.cookie("lb_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600 * 1000,
    });

    res.json({ access_token: data.access_token, expires_in: data.expires_in });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Refresh token failed" });
  }
});

// ✅ Step 4: Load search endpoint
router.post("/load-search", async (req, res) => {
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.cookies?.lb_access_token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authorization token missing — please click Authorize/Connect first." });
  }

  try {
    const response = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        metadata: { limit: 25, sortBy: { field: "Origin", direction: "Ascending" }, fields: "all" },
        includeWithGreaterPickupDates: true,
        origin: { city: req.body.originCity || "Atlanta", type: "City", radius: 100 },
        destination: { type: "Anywhere" },
        equipmentTypes: req.body.equipmentTypes || ["Van"],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data });
    res.json(data);
  } catch (error) {
    console.error("Load search failed:", error);
    res.status(500).json({ error: "Failed to fetch loads" });
  }
});

module.exports = router;
