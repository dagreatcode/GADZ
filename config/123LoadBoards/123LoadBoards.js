// Retrieve loads
const fetch = require("node-fetch");

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

// Authorization
async function getAuthorized123() {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: clientID,
    redirect_uri: devURI,
    scope: "loadsearching",
    state: "string",
    login_hint: "string",
  }).toString();

  const resp = await fetch(
    `https://api.dev.123loadboard.com/authorize?${query}`,
    {
      method: "GET",
      headers: { "User-Agent": "string" },
    }
  );

  const data = await resp.text();
  console.log(data);
}

// ///////////////////////////////////////////////////
// // Use Auth Code to Retrieve an access token (and optionally a refresh token)
// ///////////////////////////////////////////////////
// Token
async function getToken123() {
  const formData = {
    grant_type: "authorization_code",
    code: token123,
    client_id: clientID,
    redirect_uri: devURI,
  };

  const resp = await fetch(`${uri123}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "123LB-Api-Version": "1.3",
      "User-Agent": "gadzconnect_dev",
      "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
      Authorization:
        "Basic " +
        Buffer.from(
          "72278287103759907927:TSIw67aehxj4earHoFTTi6MZ62eJT9ARFmmmERHQ"
        ).toString("base64"),
    },
    body: new URLSearchParams(formData).toString(),
  });

  const data = await resp.text();
  console.log(data);
}
// /////////////////////////////////////////////////////
// Use access code above in the bearer to make call
// POST /loads  //**GET /loads/{id} */
async function getLoads123() {
  const resp = await fetch(`${uri123}/loads/search`, {
    method: "POST",
    headers: {
      "123LB-Correlation-Id": "123GADZ",
      "Content-Type": "application/json",
      "123LB-Api-Version": "1.3",
      "User-Agent": "gadzconnect_dev",
      "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
      Authorization: `bearer ${bearer123}`,
    },
    body: JSON.stringify({
      metadata: {
        nextToken: "string",
        limit: 1,
        sortBy: {
          field: "Origin",
          direction: "Ascending",
        },
        fields: "string",
        type: "Regular",
      },
      equipmentSpecifications: "None",
      includeWithGreaterPickupDates: true,
      maxAge: 2147483647,
      maxExtraDrops: 2147483647,
      hasTeam: true,
      hasRate: true,
      origin: {
        states: ["string"],
        city: "string",
        zipCode: "string",
        longitude: 0,
        latitude: 0,
        radius: 0,
        type: "City",
      },
      destination: {
        states: ["string"],
        city: "string",
        zipCode: "string",
        longitude: 0,
        latitude: 0,
        radius: 0,
        type: "Anywhere",
      },
      equipmentTypes: ["Van"],
      pickupDates: ["2019-08-24T14:15:22Z"],
      loadSize: "Tl",
      weight: 0,
      includeLoadsWithoutWeight: true,
      length: 0,
      includeLoadsWithoutLength: true,
    }),
  });

  const data = await resp.json();
  console.log(data);
}
