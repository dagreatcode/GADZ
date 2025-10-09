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

// config/123LoadBoards/123LoadBoards.js
const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/search", async (req, res) => {
  const {
    originCity,
    originState,
    radius,
    destinationType,
    equipmentTypes,
    minWeight,
    maxMileage,
    pickupDate,
    companyRating,
    modifiedStartDate,
    modifiedEndDate,
  } = req.body;

  const bearerToken = req.headers.authorization?.split(" ")[1];
  const { USER_AGENT } = process.env;

  if (!bearerToken) {
    return res.status(400).json({ error: "Missing authorization token" });
  }

  try {
    const response = await fetch(
      "https://api.dev.123loadboard.com/loads/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "123LB-Correlation-Id": "123GADZ",
          "123LB-Api-Version": "1.3",
          "User-Agent": USER_AGENT,
          "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          metadata: {
            limit: 10,
            sortBy: { field: "Origin", direction: "Ascending" },
            fields: "all",
            type: "Regular",
          },
          includeWithGreaterPickupDates: true,
          origin: {
            city: originCity,
            states: [originState],
            radius,
            type: "City",
          },
          destination: { type: destinationType },
          equipmentTypes,
          minWeight,
          maxMileage,
          pickupDates: [pickupDate],
          company: { minRating: companyRating },
          modifiedOnStart: modifiedStartDate,
          modifiedOnEnd: modifiedEndDate,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to fetch loads");

    res.json(data);
  } catch (error) {
    console.error("Error fetching 123Loadboard search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
