// Retrieve loads
const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();

// After you navigate to http://localhost:3000/authorize, the following steps should occur:

// Authorization Redirect: Your browser will be redirected to the authorization page of the API. You'll need to log in (if not already logged in) and authorize the application to access your account.

// Capture the Authorization Code:

// Once you successfully authorize the application, the API will redirect you back to your specified redirect_uri (which should be something like http://localhost:3000/auth/callback).
// In the address bar, you will see a query string appended to the URL, like this:
// bash
// Copy code
// http://localhost:3000/auth/callback?code=your_authorization_code
// The your_authorization_code is what you need to capture.
// Using the Code:

// The code is automatically captured by the server because the /auth/callback route in your Express application is set up to handle this.
// The server logs the authorization code to the console, which allows you to see it:
// css
// Copy code
// Authorization Code: your_authorization_code
// Requesting an Access Token:

// The server then uses this code to make a request to the API to exchange it for an access token.
// The response containing the access token (and possibly a refresh token) will also be logged to the console:
// css
// Copy code
// Access Token Response: { ... }
// Next Steps:

// With the access token, you can now make authorized API calls to fetch loads or other resources as needed.
// You might want to store the access token securely (e.g., in memory, database, etc.) to use it in subsequent API requests.
// Summary
// Go to http://localhost:3000/authorize → log in and authorize.
// Observe the auth/callback URL for the authorization code.
// Check your server console for the access token response.

// Constants (Move these to a config file if preferred)
const CLIENT_ID = `${process.env.CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
const DEV_URI = `${process.env.DEV_URI}`;
const URI_123 = `${process.env.URI_123}`;
const USER_AGENT = "gadzconnect_dev";

// Authorization route function
async function authorize(req, res) {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: DEV_URI,
    scope: "loadsearching",
    state: "string",
    login_hint: "gadzconnect_dev",
  }).toString();

  res.redirect(`${URI_123}/authorize?${query}`);
}

// Callback route function
async function authCallback(req, res) {
  try {
    const authCode = req.query.code;
    console.log("Authorization Code:", authCode);

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
        "User-Agent": USER_AGENT,
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    console.log("Access Token Response:", tokenData);

    if (tokenData.access_token) {
      const bearerToken = tokenData.access_token;

      // Use access token to fetch loads
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
        // body: JSON.stringify({
        //   metadata: {
        //     limit: 10,
        //     sortBy: { field: "Origin", direction: "Ascending" },
        //     fields: "all", // Including all available fields in the response
        //     type: "Regular", // Type of load
        //   },
        //   includeWithGreaterPickupDates: true, // Include loads with greater pickup dates
        //   origin: {
        //     states: ["IL"], // Filter loads from Illinois
        //     city: "Chicago", // Filter loads originating in Chicago
        //     radius: 100, // Search within a 100-mile radius
        //     type: "City", // Origin type
        //   },
        //   destination: {
        //     type: "Anywhere", // Destination type (Anywhere)
        //   },
        //   equipmentTypes: ["Van", "Flatbed", "Reefer"], // Types of equipment you're interested in
        //   includeLoadsWithoutWeight: true, // Include loads without weight information
        //   includeLoadsWithoutLength: true, // Include loads without length information
        //   company: {
        //     name: "ExampleCompany", // Name of the company (replace with actual)
        //     types: "None", // Type of company (None as a placeholder)
        //     minRating: 5, // Minimum rating of the company
        //     isFavorite: true, // Whether the company is a favorite
        //     isFactorable: true, // Whether the load is factorable
        //     isTiaMember: true, // Whether the company is a TIA member
        //     isTiaCertified: true, // Whether the company is TIA certified
        //   },
        //   modifiedOnStart: "2023-01-01T00:00:00Z", // Modified date range start
        //   modifiedOnEnd: "2023-12-31T23:59:59Z", // Modified date range end
        //   minMileage: 100, // Minimum mileage for the load
        //   maxMileage: 500, // Maximum mileage for the load
        //   weight: 10000, // Minimum weight for the load
        //   includeLoadsWithoutWeight: true, // Include loads without weight
        //   length: 40, // Minimum length of the load
        //   includeLoadsWithoutLength: true, // Include loads without length
        //   pickupDates: ["2023-12-01T00:00:00Z"], // Specify the pickup date
        // }),
        //   body: JSON.stringify({
        //     metadata: {
        //       limit: 10,
        //       sortBy: { field: "Origin", direction: "Ascending" },
        //       fields: "all",
        //       type: "Regular",
        //     },
        //     includeWithGreaterPickupDates: true,
        //     origin: {
        //       states: ["IL"],
        //       city: "Chicago",
        //       radius: 100,
        //       type: "City",
        //     },
        //     destination: { type: "Anywhere" },
        //     equipmentTypes: ["Van", "Flatbed", "Reefer"],
        //     includeLoadsWithoutWeight: true,
        //     includeLoadsWithoutLength: true,
        //     company: {
        //       name: "ExampleCompany",
        //       types: "None",
        //       minRating: 5,
        //       isFavorite: true,
        //       isFactorable: true,
        //       isTiaMember: true,
        //       isTiaCertified: true,
        //     },
        //     modifiedOnStart: "2023-01-01T00:00:00Z",
        //     modifiedOnEnd: "2023-12-31T23:59:59Z",
        //     minMileage: 100,
        //     maxMileage: 500,
        //     weight: 10000,
        //     length: 40,
        //     pickupDates: ["2023-12-01T00:00:00Z"],
        //   }),
        // });

        body: JSON.stringify({
          metadata: {
            nextToken: "string",
            limit: 25,
            sortBy: { field: "Origin", direction: "Ascending" },
            fields: "all",
            type: "Regular"
          },

          equipmentSpecifications:
            "AirRide,BlanketWrap,Conestoga,Chains,HazMat,Tarps,TeamDriver",
          includeWithGreaterPickupDates: true,
          maxAge: 86400, // 1 day old max
          maxExtraDrops: 5,
          hasTeam: true,
          hasRate: true,

          company: {
            name: "ExampleCarrier",
            types: "None",
            minRating: 4,
            isFavorite: false,
            isFactorable: true,
            isTiaMember: true,
            isTiaCertified: false
          },

          modifiedOnStart: "2023-01-01T00:00:00Z",
          modifiedOnEnd: "2023-12-31T23:59:59Z",
          minMileage: 100,
          maxMileage: 2500,
          minOriginRadius: 50,
          isFavoriteBroker: false,
          minWeight: 1000,
          minLength: 10,

          origin: {
            states: ["IL", "IN", "WI"],
            city: "Chicago",
            zipCode: "60601",
            longitude: -87.6298,
            latitude: 41.8781,
            radius: 100,
            type: "City"
          },

          destination: {
            states: ["GA", "TN", "AL"],
            city: "Atlanta",
            zipCode: "30301",
            longitude: -84.388,
            latitude: 33.749,
            radius: 100,
            type: "Anywhere"
          },

          equipmentTypes: [
            "Van",
            "Reefer",
            "Flatbed",
            "StepDeck",
            "PowerOnly",
            "BoxTruck"
          ],
          pickupDates: ["2023-12-01T00:00:00Z"],
          loadSize: "Tl",
          weight: 10000,
          includeLoadsWithoutWeight: true,
          length: 40,
          includeLoadsWithoutLength: true
        })
      });
      
      const loadData = await loadResp.json();
      console.log("Load Response:", loadData);
      res.send(loadData);
    } else {
      console.error("Access token not found in response:", tokenData);
      res.status(400).send("Failed to retrieve access token.");
    }
  } catch (error) {
    console.error("Error during callback:", error);
    res.status(500).send("An error occurred during the process.");
  }
}

// Define routes
router.get("/authorize", authorize);
router.get("/auth/callback", authCallback);

module.exports = router;
