// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const axios = require("axios");
const bodyParser = require("body-parser");
const handleVideoSocket = require("./config/videoSocket");
const handleMessageSocket = require("./config/messageSocket");
const loadController = require("./controllers/LoadController");
const messageRouter = require("./controllers/MessageController.js");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(express.static("images"));
app.use(bodyParser.json());

const ServerPort = process.env.SOCKET_IO_SERVER_PORT;

// const clientRedirect = process.env.REDIRECT_URI;

app.use(
  cors({
    origin: ServerPort,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const io = socketIo(server, {
  cors: {
    origin: `${ServerPort}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  handleVideoSocket(io, socket);
  handleMessageSocket(io, socket);
});

// Middleware
// app.use(express.json()); // To parse JSON bodies

// Use the message routes
app.use("/api/message", messageRouter);
// Other routes...
app.use("/api/agreement", require("./controllers/AgreementController.js"));
app.use("/api/user", require("./controllers/UserAPIRoutes.js"));
app.use("/api/admin", require("./controllers/AdminController.js"));
app.use("/api/it-help", require("./controllers/ITticketController.js"));
app.use(
  "/api/employee-help",
  require("./controllers/EmployeeTicketController.js")
);
// app.use("/api/message", require("./controllers/MessageController.js"));
app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
app.use(require("./routes"));

// app.use("/api/loads", loadRoutes); // Add this line

// Route to get all loads for a specific user
app.get("/api/loads/user/:userId", loadController.getAllUserLoads);
// Load routes
app.get("/api/loads", loadController.getAllLoads); // Get all loads
app.post("/api/loads", loadController.createLoad); // Create a new load

// // Retrieve loads ////////////////////////////////////
const fetch = require("node-fetch");
//
const clientID = process.env.CLIENT_ID;
const token123 = process.env.TOKEN_123; // Authorization code
const devURI = process.env.DEV_URI;
const clientSecret = process.env.CLIENT_SECRET;
const bearer123 = process.env.BEARER_123;
const uri123 = process.env.URI_123;
const userAgent = process.env.USER_AGENT;
// ///////////////////////////////////////////////////
// // Use Route to Retrieve an Auth Code
// ///////////////////////////////////////////////////
// 1. Route to start the OAuth flow
app.get("/authorize", async (req, res) => {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: clientID,
    redirect_uri: devURI,
    scope: "loadsearching",
    state: "string",
    login_hint: "gadzconnect_dev",
  }).toString();

  // Redirect the user to the authorization URL
  res.redirect(`${uri123}/authorize?${query}`);
  // console.log();
});
// ///////////////////////////////////////////////////
// Use Auth Code to Retrieve an access token (and optionally a refresh token)
// ///////////////////////////////////////////////////
// ex: address route http://localhost:3001/tokenreceiver?code=62ae7760f17740baa91122dcaaf9db9af38cff1fd46a4980afc1de6d180c3758
// 2. Route to handle the redirect #Auth Code //**Not Needed*/
app.get("/tokenreceiver", async (req, res) => {
  const authCode = req.query.code; // Extract the authorization code from the query params
  console.log("Authorization Code:", authCode);

  // Use the authCode to request an access token
  const formData = new URLSearchParams({
    grant_type: "authorization_code",
    code: authCode,
    client_id: clientID,
    redirect_uri: devURI,
  }).toString();

  const tokenResp = await fetch(`${uri123}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "123LB-Api-Version": "1.3",
      "User-Agent": "gadzconnect_dev",
      "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf", // Replace with your actual AID
      Authorization:
        "Basic " +
        Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
    },
    body: formData,
  });

  const tokenData = await tokenResp.json();
  console.log("Access Token Response:", tokenData);

  res.send(
    "Authorization code received and access token requested. Check your console."
  );
});
///////////////////////////////////////////////////

// or 2 and 3. Route to get authorization from params/query code and exchange it for access_token, then request loads from 123Loads
app.get("/auth/callback/", async (req, res) => {
  try {
    const authCode = req.query.code; // Get the code from the address bar
    console.log("Authorization Code:", authCode);

    // Step 2: Exchange authorization code for access token
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      client_id: clientID,
      redirect_uri: devURI, // Ensure this matches your registered redirect URI
    }).toString();

    const tokenResp = await fetch(`${uri123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": "gadzconnect_dev",
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        Authorization:
          "Basic " +
          Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    console.log("Access Token Response:", tokenData);

    if (tokenData.access_token) {
      const bearerToken = tokenData.access_token; // Save the token

      // Step 3: Use the access token to request loads
      const loadResp = await fetch(`${uri123}/loads/search`, {
        method: "POST",
        headers: {
          "123LB-Correlation-Id": "123GADZ",
          "Content-Type": "application/json",
          "123LB-Api-Version": "1.3",
          "User-Agent": userAgent,
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
            states: ["IL"],
            city: "Chicago",
            radius: 100,
            type: "City",
          },
          destination: {
            type: "Anywhere",
          },
          equipmentTypes: ["Van", "Flatbed", "Reefer"],
          includeLoadsWithoutWeight: true,
          includeLoadsWithoutLength: true,
        }),
      });

      const loadData = await loadResp.json();
      console.log("Load Response:", loadData);
      // res.send(loadData);
      res.render("AvailableTable", { loadData });
    } else {
      console.error("Access token not found in response:", tokenData);
      res.status(400).send("Failed to retrieve access token.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during the process.");
  }
});
////////////////////////////////////////////////////
// RAW Routes //
// async function run() {
//   const query = new URLSearchParams({
//     response_type: "code",
//     client_id: clientID,
//     redirect_uri: devURI,
//     scope: "loadsearching",
//     state: "string",
//     login_hint: "string",
//   }).toString();

//   const resp = await fetch(
//     `https://api.dev.123loadboard.com/authorize?${query}`,
//     {
//       method: "GET",
//       headers: { "User-Agent": "string" },
//     }
//   );

//   const data = await resp.text();
//   console.log(data);
// }
// async function run() {
//   const formData = {
//     grant_type: "authorization_code",
//     code: token123,
//     client_id: clientID,
//     redirect_uri: devURI,
//   };

//   const resp = await fetch(`https://api.dev.123loadboard.com/token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "123LB-Api-Version": "1.3",
//       "User-Agent": "gadzconnect_dev",
//       "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//       Authorization:
//         "Basic " +
//         Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
//     },
//     body: new URLSearchParams(formData).toString(),
//   });

//   const data = await resp.text();
//   console.log(data);
// }
// RAW Routes //
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// Use Auth Code to Retrieve an access token (and optionally a refresh token) and make an POST /loads/search
// Main endpoint for searching for loads as a carrier. Get /loads/{id} is the only other route available.

///////////////////////////////////////////////////
// async function getToken() {
//   const formData = {
//     grant_type: "authorization_code",
//     code: token123,
//     client_id: clientID,
//     redirect_uri: devURI,
//   };

//   const resp = await fetch(`${uri123}/token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "123LB-Api-Version": "1.3",
//       "User-Agent": "gadzconnect_dev",
//       "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//       Authorization:
//         "Basic " +
//         Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
//     },
//     body: new URLSearchParams(formData).toString(),
//   });

//   const data = await resp.json();

//   // Check if the response has an access token
//   if (data.access_token) {
//     bearerToken = data.access_token; // Save the token for later use
//     console.log("Access Token:", bearerToken);
//     console.log("Access All Data:", data);
//   } else {
//     console.error("Access token not found in response:", data);
//   }
//   getLoads();
// }
// let bearerToken; // Variable to store the access token
// Use access code above as the bearer ${bearerToken} to make call.
// async function getLoads() {
//   if (!bearerToken) {
//     console.error("Bearer token is not available. Please run run2 first.");
//     return;
//   }

//   const resp = await fetch(`${uri123}/loads/search`, {
//     method: "POST",
//     headers: {
//       "123LB-Correlation-Id": "123GADZ",
//       "Content-Type": "application/json",
//       "123LB-Api-Version": "1.3",
//       "User-Agent": "gadzconnect_dev",
//       "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     body: JSON.stringify({
//       metadata: {
//         nextToken: "string",
//         limit: 1,
//         sortBy: {
//           field: "Origin",
//           direction: "Ascending",
//         },
//         fields: "string",
//         type: "Regular",
//       },
//       equipmentSpecifications: "None",
//       includeWithGreaterPickupDates: true,
//       maxAge: 2147483647,
//       maxExtraDrops: 2147483647,
//       hasTeam: true,
//       hasRate: true,
//       origin: {
//         states: ["string"], // ["GA"], // Add the required state
//         city: "string", // "Atlanta", // Add the required city
//         zipCode: "string", // 30301
//         longitude: 0,
//         latitude: 0,
//         radius: 0,
//         type: "City",
//       },
//       destination: {
//         states: ["string"],
//         city: "string",
//         zipCode: "string",
//         longitude: 0,
//         latitude: 0,
//         radius: 0,
//         type: "Anywhere",
//       },
//       equipmentTypes: ["Van"],
//       pickupDates: ["2019-08-24T14:15:22Z"],
//       loadSize: "Tl",
//       weight: 0,
//       includeLoadsWithoutWeight: true,
//       length: 0,
//       includeLoadsWithoutLength: true,
//     }),
//   });

//   const data = await resp.json();
//   console.log(data);
// }
// getToken();
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// Test routes
app.get("/api/config", (req, res) => {
  res.json({ success: true });
});
app.get("/apiFun", (req, res) => {
  res.send("API FUN");
});
///////////////////////////////////////////////////
// Used as a wildcard if something goes wrong
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
///////////////////////////////////////////////////
// { alter: true }
// Connect to SQL Database
db.sequelize
  .sync({})
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err.message);
  });
