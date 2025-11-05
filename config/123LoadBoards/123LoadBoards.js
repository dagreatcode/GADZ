// backend/routes/loadboard.js
const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

// Constants (ideally move to .env or config file)
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const DEV_URI = process.env.DEV_URI; // e.g., "http://localhost:3000/auth/callback"
const URI_123 = process.env.URI_123; // Base API URL
const USER_AGENT = "gadzconnect_dev";

// Authorization route
async function authorize(req, res) {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: DEV_URI,
    scope: "loadsearching",
    state: "string",
    login_hint: USER_AGENT,
  }).toString();

  res.redirect(`${URI_123}/authorize?${query}`);
}

// Route to handle token exchange and fetch loads dynamically
async function authCallMeBack(req, res) {
  // app.post("/auth/callMeBack", async (req, res) => {
  try {
    const authCode = req.query.code || req.body.code;
    const searchData = req.body;

    console.log("Authorization Code:", authCode);
    console.log("Search Data from Frontend:", searchData);

    if (!authCode) {
      return res.status(400).json({ error: "Missing authorization code." });
    }

    // Exchange authorization code for access token
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
        "User-Agent": "gadzconnect_dev",
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        Authorization:
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    console.log("Access Token Response:", tokenData);

    if (!tokenData.access_token) {
      console.error("Access token not found in response:", tokenData);
      return res.status(400).json({ error: "Failed to retrieve access token." });
    }

    const bearerToken = tokenData.access_token;

    // Use access token to fetch loads with frontend data
    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "123LB-Correlation-Id": "123GADZ",
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": USER_AGENT,
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        metadata: {
          limit: searchData.limit || 10,
          sortBy: { field: "Origin", direction: "Ascending" },
          fields: "all",
          type: "Regular",
        },
        includeWithGreaterPickupDates: true,
        origin: {
          states: [searchData.originState || "IL"],
          city: searchData.originCity || "Chicago",
          radius: parseInt(searchData.radius || 100),
          type: "City",
        },
        destination: {
          type: searchData.destinationType || "Anywhere",
        },
        equipmentTypes: searchData.equipmentTypes
          ? [searchData.equipmentTypes]
          : ["Van", "Flatbed", "Reefer"],
        includeLoadsWithoutWeight: true,
        includeLoadsWithoutLength: true,
      }),
    });

    const loadData = await loadResp.json();
    console.log("Load Response:", loadData);

    res.status(200).json(loadData);
  } catch (error) {
    console.error("Error in /auth/callback:", error);
    res.status(500).json({ error: "An error occurred during the process." });
  }
};

// Define routes
router.get("/authorize", authorize);
router.post("/auth/callMeBack", authCallMeBack);

module.exports = router;
