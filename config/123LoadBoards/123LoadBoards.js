// // backend/routes/loadboard.js
// const fetch = require("node-fetch");
// const express = require("express");
// const router = express.Router();

// // Constants (ideally move to .env or config file)
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const DEV_URI = process.env.DEV_URI; // e.g., "http://localhost:3000/auth/callback"
// const URI_123 = process.env.URI_123; // Base API URL
// const USER_AGENT = "gadzconnect_dev";

// // Authorization route
// async function authorize(req, res) {
//   const query = new URLSearchParams({
//     response_type: "code",
//     client_id: CLIENT_ID,
//     redirect_uri: DEV_URI,
//     scope: "loadsearching",
//     state: "string",
//     login_hint: USER_AGENT,
//   }).toString();

//   res.redirect(`${URI_123}/authorize?${query}`);
// }

// // Callback route
// async function authCallback(req, res) {
//   try {
//     const authCode = req.query.code;
//     console.log("Authorization Code:", authCode);

//     // Exchange authorization code for access token
//     const formData = new URLSearchParams({
//       grant_type: "authorization_code",
//       code: authCode,
//       client_id: CLIENT_ID,
//       redirect_uri: DEV_URI,
//     }).toString();

//     const tokenResp = await fetch(`${URI_123}/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//         Authorization:
//           "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//       },
//       body: formData,
//     });

//     const tokenData = await tokenResp.json();
//     console.log("Access Token Response:", tokenData);

//     if (!tokenData.access_token) {
//       console.error("Access token not found in response:", tokenData);
//       return res.status(400).send("Failed to retrieve access token.");
//     }

//     const bearerToken = tokenData.access_token;

//     // -----------------------------
//     // Endpoint to receive POST request from frontend
//     // -----------------------------
//     router.post("/search", async (req, resSearch) => {
//       try {
//         const {
//           originStates,
//           originCity,
//           originZip,
//           originLat,
//           originLng,
//           destinationStates,
//           destinationCity,
//           destinationZip,
//           destinationLat,
//           destinationLng,
//           equipmentTypes,
//           pickupDates,
//           minWeight,
//           maxWeight,
//           minMileage,
//           maxMileage,
//           loadSize,
//           length,
//           maxExtraDrops,
//           hasTeam,
//           hasRate,
//         } = req.body;

//         const loadResp = await fetch(`${URI_123}/loads/search`, {
//           method: "POST",
//           headers: {
//             "123LB-Correlation-Id": "123GADZ",
//             "Content-Type": "application/json",
//             "123LB-Api-Version": "1.3",
//             "User-Agent": USER_AGENT,
//             "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//             Authorization: `Bearer ${bearerToken}`,
//           },
//           body: JSON.stringify({
//             metadata: {
//               nextToken: "string",
//               limit: 25,
//               sortBy: { field: "Origin", direction: "Ascending" },
//               fields: "all",
//               type: "Regular",
//             },
//             equipmentSpecifications:
//               "AirRide,BlanketWrap,Conestoga,Chains,HazMat,Tarps,TeamDriver",
//             includeWithGreaterPickupDates: true,
//             maxAge: 86400,
//             maxExtraDrops,
//             hasTeam,
//             hasRate,
//             company: {
//               name: "ExampleCarrier",
//               types: "None",
//               minRating: 4,
//               isFavorite: false,
//               isFactorable: true,
//               isTiaMember: true,
//               isTiaCertified: false,
//             },
//             modifiedOnStart: "2023-01-01T00:00:00Z",
//             modifiedOnEnd: "2023-12-31T23:59:59Z",
//             minMileage,
//             maxMileage,
//             minOriginRadius: 50,
//             isFavoriteBroker: false,
//             minWeight,
//             maxWeight,
//             minLength: length,
//             pickupDates,
//             origin: {
//               states: originStates,
//               city: originCity,
//               zipCode: originZip,
//               longitude: originLng,
//               latitude: originLat,
//               radius: 100,
//               type: "City",
//             },
//             destination: {
//               states: destinationStates,
//               city: destinationCity,
//               zipCode: destinationZip,
//               longitude: destinationLng,
//               latitude: destinationLat,
//               radius: 100,
//               type: "Anywhere",
//             },
//             equipmentTypes,
//             loadSize,
//             includeLoadsWithoutWeight: true,
//             includeLoadsWithoutLength: true,
//           }),
//         });

//         const loadData = await loadResp.json();
//         console.log("Load Response:", loadData);
//         resSearch.send(loadData);
//       } catch (err) {
//         console.error("Error fetching loads:", err);
//         resSearch.status(500).send({ error: "Error fetching loads" });
//       }
//     });
//   } catch (error) {
//     console.error("Error during callback:", error);
//     res.status(500).send("An error occurred during the process.");
//   }
// }

// // Define routes
// router.get("/authorize", authorize);
// router.get("/auth/callback", authCallback);

// module.exports = router;

// // config/123LoadBoards/123LoadBoards.js
// const express = require("express");
// const fetch = require("node-fetch"); // ensure node-fetch is installed
// const router = express.Router();

// /**
//  * Environment variables expected:
//  * - CLIENT_ID
//  * - CLIENT_SECRET
//  * - DEV_URI (frontend redirect / callback url, e.g. https://gadzconnect.com/auth/callback or http://localhost:3000/auth/callback)
//  * - URI_123 (base 123LoadBoard API/authorize/token URL, e.g. https://api.123loadboard.com or their auth host)
//  * - USER_AGENT
//  * - LOADBOARD_AID (optional)
//  *
//  * NOTE: For production, ensure secure cookie settings (secure: true, sameSite, etc).
//  */

// // helper to build auth redirect
// router.get("/authorize", (req, res) => {
//   const {
//     CLIENT_ID,
//     DEV_URI,
//     URI_123,
//     USER_AGENT = "gadzconnect_dev",
//   } = process.env;

//   if (!CLIENT_ID || !DEV_URI || !URI_123) {
//     console.error("Missing env vars for /authorize");
//     return res.status(500).send("Server misconfigured (missing OAuth env vars).");
//   }

//   const query = new URLSearchParams({
//     response_type: "code",
//     client_id: CLIENT_ID,
//     redirect_uri: DEV_URI,
//     scope: "loadsearching", // keep same scope you used before
//     state: "gadz_state", // you can create a real random state in production
//     login_hint: USER_AGENT,
//   }).toString();

//   res.redirect(`${URI_123}/authorize?${query}`);
// });

// // callback route - exchange code for access token
// router.get("/auth/callback", async (req, res) => {
//   const {
//     CLIENT_ID,
//     CLIENT_SECRET,
//     DEV_URI,
//     URI_123,
//     USER_AGENT = "gadzconnect_dev",
//     LOADBOARD_AID = "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//   } = process.env;

//   try {
//     const authCode = req.query.code;
//     if (!authCode) {
//       return res.status(400).send("Missing authorization code.");
//     }

//     const formData = new URLSearchParams({
//       grant_type: "authorization_code",
//       code: authCode,
//       client_id: CLIENT_ID,
//       redirect_uri: DEV_URI,
//     }).toString();

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
//       body: formData,
//     });

//     const tokenData = await tokenResp.json();
//     console.log("Token response from 123:", tokenData);

//     if (!tokenData.access_token) {
//       console.error("No access_token in token response:", tokenData);
//       return res.status(400).json({ error: "Failed to retrieve access token", details: tokenData });
//     }

//     // Set cookies (accessible via JS) so frontend can read or you can return token JSON
//     // Note: in production set secure: true and sameSite appropriately
//     const cookieOptions = [
//       `lb_access_token=${tokenData.access_token}; Path=/;`,
//       tokenData.refresh_token ? `lb_refresh_token=${tokenData.refresh_token}; Path=/;` : "",
//     ].filter(Boolean).join(" ");

//     // Send cookies in header
//     res.setHeader("Set-Cookie", cookieOptions);

//     // Return token JSON (frontend can pick this up and store in localStorage)
//     // This keeps previous behavior where frontend stored token in localStorage
//     return res.json({
//       access_token: tokenData.access_token,
//       refresh_token: tokenData.refresh_token,
//       expires_in: tokenData.expires_in,
//       scope: tokenData.scope,
//       raw: tokenData,
//     });
//   } catch (err) {
//     console.error("Error during auth callback:", err);
//     return res.status(500).json({ error: "Callback error", details: String(err) });
//   }
// });

// // optional: refresh token endpoint (frontend can call to refresh)
// router.post("/refresh-token", async (req, res) => {
//   // Accept refresh_token in body or from cookie if present
//   const { refresh_token } = req.body;
//   const { CLIENT_ID, CLIENT_SECRET, URI_123, USER_AGENT = "gadzconnect_dev", LOADBOARD_AID } = process.env;

//   const tokenToUse = refresh_token || (req.headers.cookie && req.headers.cookie.match(/lb_refresh_token=([^;]+)/)?.[1]);

//   if (!tokenToUse) {
//     return res.status(400).json({ error: "refresh_token missing" });
//   }

//   try {
//     const formData = new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token: tokenToUse,
//       client_id: CLIENT_ID,
//     }).toString();

//     const tokenResp = await fetch(`${URI_123}/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": LOADBOARD_AID || "",
//         Authorization:
//           "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//       },
//       body: formData,
//     });

//     const tokenData = await tokenResp.json();
//     if (!tokenData.access_token) {
//       return res.status(400).json({ error: "Failed to refresh token", details: tokenData });
//     }

//     const cookieOptions = [
//       `lb_access_token=${tokenData.access_token}; Path=/;`,
//       tokenData.refresh_token ? `lb_refresh_token=${tokenData.refresh_token}; Path=/;` : "",
//     ].filter(Boolean).join(" ");

//     res.setHeader("Set-Cookie", cookieOptions);

//     // return res.json({
//     //   access_token: tokenData.access_token,
//     //   refresh_token: tokenData.refresh_token,
//     //   expires_in: tokenData.expires_in,
//     //   raw: tokenData,
//     // });
//     // ✅ NEW: redirect user back to frontend after auth success
//     // Example frontend URL: http://localhost:3000/dashboard or whatever your app uses
//     const FRONTEND_REDIRECT = process.env.FRONTEND_REDIRECT || "http://localhost:3000/AvailableTable";

//     res.setHeader("Set-Cookie", cookieOptions);

//     // Append a simple flag so frontend knows auth worked
//     return res.redirect(`${FRONTEND_REDIRECT}?authorized=123`);

//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     return res.status(500).json({ error: "refresh error", details: String(err) });
//   }
// });

// // Primary search endpoint used by frontend
// router.post("/search", async (req, res) => {
//   const {
//     originCity,
//     originState,
//     radius,
//     destinationType,
//     equipmentTypes,
//     minWeight,
//     maxMileage,
//     pickupDate,
//     companyRating,
//     modifiedStartDate,
//     modifiedEndDate,
//   } = req.body;

//   // First try Authorization header, then cookie
//   const authHeader = req.headers.authorization;
//   const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
//   const cookieToken = req.headers.cookie?.match(/lb_access_token=([^;]+)/)?.[1];

//   const token = bearerToken || cookieToken;
//   const { USER_AGENT = "gadzconnect_dev", LOADBOARD_AID = "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf" } = process.env;

//   if (!token) {
//     return res.status(400).json({ error: "Missing authorization token" });
//   }

//   try {
//     const response = await fetch(
//       `${process.env.URI_123 || "https://api.dev.123loadboard.com"}/loads/search`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "123LB-Correlation-Id": "123GADZ",
//           "123LB-Api-Version": "1.3",
//           "User-Agent": USER_AGENT,
//           "123LB-AID": LOADBOARD_AID,
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           metadata: {
//             limit: 10,
//             sortBy: { field: "Origin", direction: "Ascending" },
//             fields: "all",
//             type: "Regular",
//           },
//           includeWithGreaterPickupDates: true,
//           origin: {
//             city: originCity,
//             states: originState ? [originState] : undefined,
//             radius,
//             type: "City",
//           },
//           destination: { type: destinationType || "Anywhere" },
//           equipmentTypes,
//           minWeight,
//           maxMileage,
//           pickupDates: pickupDate ? [pickupDate] : undefined,
//           company: { minRating: companyRating },
//           modifiedOnStart: modifiedStartDate,
//           modifiedOnEnd: modifiedEndDate,
//         }),
//       }
//     );

//     const data = await response.json();
//     if (!response.ok) {
//       console.error("123Loadboard search responded with non-OK:", data);
//       return res.status(response.status).json({ error: data || "Failed to fetch loads" });
//     }

//     return res.json(data);
//   } catch (err) {
//     console.error("Error fetching 123Loadboard search results:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const CLIENT_ID = process.env.LOADBOARD_CLIENT_ID;
const CLIENT_SECRET = process.env.LOADBOARD_CLIENT_SECRET;
const REDIRECT_URI = process.env.LOADBOARD_REDIRECT_URI;
const URI_123 = process.env.URI_123;
const USER_AGENT = process.env.USER_AGENT;
const LOADBOARD_AID = process.env.LOADBOARD_AID;

// ---------- Step 1: Redirect to 123Loadboard Authorization ----------
router.get("/authorize", (req, res) => {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "loadsearching",
    state: "gadz_state",
    login_hint: USER_AGENT,
  }).toString();

  res.redirect(`${URI_123}/authorize?${query}`);
});

// ---------- Step 2: Handle OAuth callback ----------
router.get("/auth/callback", async (req, res) => {
  const authCode = req.query.code;
  if (!authCode) return res.status(400).send("Missing authorization code");

  try {
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
    }).toString();

    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    if (!tokenData.access_token) {
      console.error("No access token returned:", tokenData);
      return res.status(400).send("Failed to retrieve access token.");
    }

    // Set token as HTTP-only cookie
    res.cookie("lb_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: tokenData.expires_in * 1000,
    });

    // Redirect back to frontend
    res.redirect(`${process.env.FRONTEND_REDIRECT}?autofill=true`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).send("OAuth callback failed");
  }
});

// ---------- Step 3: Search loads with stored token ----------
router.post("/load-search", async (req, res) => {
  try {
    const authToken = req.cookies.lb_access_token;
    if (!authToken) return res.status(401).send({ error: "Missing access token" });

    const body = {
      metadata: {
        nextToken: "string",
        limit: 25,
        sortBy: { field: "Origin", direction: "Ascending" },
        fields: "all",
        type: "Regular",
      },
      equipmentSpecifications: "AirRide,BlanketWrap,Conestoga,Chains,HazMat,Tarps,TeamDriver",
      ...req.body, // Merge search parameters from frontend
    };

    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "123LB-Correlation-Id": "GADZ123",
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": LOADBOARD_AID,
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    });

    const loadData = await loadResp.json();
    res.json(loadData);
  } catch (err) {
    console.error("Error fetching loads:", err);
    res.status(500).send({ error: "Load search failed" });
  }
});

module.exports = router;
