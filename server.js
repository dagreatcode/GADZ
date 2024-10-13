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

// Other routes...
app.use("/api/agreement", require("./controllers/AgreementController.js"));
app.use("/api/user", require("./controllers/UserAPIRoutes.js"));
app.use("/api/admin", require("./controllers/AdminController.js"));
app.use("/api/it-help", require("./controllers/ITticketController.js"));
app.use(
  "/api/employee-help",
  require("./controllers/EmployeeTicketController.js")
);
app.use("/api/message", require("./controllers/MessageController.js"));
app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
app.use(require("./routes"));

// Load routes
app.get("/api/loads", loadController.getAllLoads); // Get all loads
app.post("/api/loads", loadController.createLoad); // Create a new load

// const { Load, User } = require("./models"); // Adjust the import path as necessary

// app.post("/loads", async (req, res) => {
//   const { description, company, userId } = req.body;
//   // Validate userId
//   if (!userId) {
//     console.log("logs", req.body);
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     // Check if the user exists
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User does not exist." });
//     }

//     // Create load
//     const newLoad = await Load.create({ description, company, userId });
//     return res.status(201).json(newLoad);
//   } catch (error) {
//     console.error("Error creating load:", error);
//     return res
//       .status(500)
//       .json({ error: "An error occurred while creating the load." });
//   }
// });

// app.post("/api/myLoads", async (req, res) => {
//   const { description, company, userId } = req.body;

//   // // Check if user exists
//   // const user = await db.User.findByPk(userId);
//   // if (!user) {
//   //   return res.status(400).json({ error: "User does not exist." });
//   // }

//   try {
//     const newLoad = await db.Load.create({ description, company, userId });
//     res.status(201).json(newLoad);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// FIXME: This works TODO: Delete this once not
// // API endpoints for QR code creation and viewing
// app.post("/api/qr-create", async (req, res) => {
//   const data = req.body;
//   try {
//     const response = await axios.post(
//       "https://hovercode.com/api/v2/hovercode/create/",
//       data,
//       {
//         headers: {
//           Authorization: `Token ${process.env.API_KEY_QR}`,
//         },
//         timeout: 10000,
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error posting QR:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/api/qr-view", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://hovercode.com/api/v2/workspace/82140683-32bd-4422-9ff9-7ecec248c952/hovercodes/",
//       {
//         headers: {
//           Authorization: `Token ${process.env.API_KEY_QR}`,
//         },
//         timeout: 10000,
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching QR codes:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Retrieve loads ////////////////////////////////////
const fetch = require("node-fetch");
//
const clientID = process.env.CLIENT_ID;
const token123 = process.env.TOKEN_123; // Authorization code
const devURI = process.env.DEV_URI;
const clientSecret = process.env.CLIENT_SECRET;
const reToken123 = process.env.RE_TOKEN_123;

// Route to start the OAuth flow
app.get("/authorize", async (req, res) => {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: clientID,
    redirect_uri: devURI,
    scope: "loadsearching",
    state: "string",
    login_hint: "string",
  }).toString();

  // Redirect the user to the authorization URL
  res.redirect(`https://api.dev.123loadboard.com/authorize?${query}`);
});

// Route to handle the redirect
app.get("/auth/callback", async (req, res) => {
  const authCode = req.query.code; // Extract the authorization code from the query params
  console.log("Authorization Code:", authCode);

  // Use the authCode to request an access token
  const formData = new URLSearchParams({
    grant_type: "authorization_code",
    code: authCode,
    client_id: clientID,
    redirect_uri: devURI,
  }).toString();

  const tokenResp = await fetch("https://api.dev.123loadboard.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "123LB-Api-Version": "1.3",
      "User-Agent": "gadzconnect_dev",
      "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf", // Replace with your actual AID
      Authorization:
        "Basic " +
        Buffer.from("your_client_id:your_client_secret").toString("base64"),
    },
    body: formData,
  });

  const tokenData = await tokenResp.json();
  console.log("Access Token Response:", tokenData);

  res.send(
    "Authorization code received and access token requested. Check your console."
  );
});

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

// //
// // Authorization
// // async function run() {
// //   const query = new URLSearchParams({
// //     response_type: "code",
// //     client_id: clientID,
// //     redirect_uri: devURI,
// //     scope: "loadsearching",
// //     state: "string",
// //     login_hint: "string",
// //   }).toString();

// //   const resp = await fetch(
// //     `https://api.dev.123loadboard.com/authorize?${query}`,
// //     {
// //       method: "GET",
// //       headers: { "User-Agent": "string" },
// //     }
// //   );

// //   const data = await resp.text();
// //   console.log(data);
// // }

// ///////////////////////////////////////////////////
// // Use Auth Code to Retrieve an access token (and optionally a refresh token)
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
//         Buffer.from(
//           "72278287103759907927:TSIw67aehxj4earHoFTTi6MZ62eJT9ARFmmmERHQ"
//         ).toString("base64"),
//     },
//     body: new URLSearchParams(formData).toString(),
//   });

//   const data = await resp.text();
//   console.log(data);
// }
// /////////////////////////////////////////////////////
// // Use access code above in the bearer to make call
// async function run() {
//   const resp = await fetch(`https://api.dev.123loadboard.com/loads/search`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "123LB-Api-Version": "1.3",
//       "User-Agent": "gadzconnect_dev",
//       "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//       Authorization:
//         "bearer LHTciINa6gQSY5WLitZ8wESHA-j7EUW_-ixPOp_tHK24Ph73S92aw25EF-4VNWnCuDxQbzl5ypNe0uKqAgL9hc6xuCCjkLj0ujJfACGT8OIiuLA9ok_nvO9kCVqG03tgThj131jLDM4Z2d8l8Tsjs4scK0EoUonTAARLp5ztSxgk-LK7vUk36y9MPzvVBtbJOurDBSPJrZbEM17_K9thwCfz8wEcNMiMBZbp42FmhNQ1Sll8j1zTXcT_UF_VbJt0m0idHnWgd6HCUo04YMILKFC8lG7-5jrGrSnlj2g3xHBpgbujJdn9GM6swMxThY7jlLY2CXDphwHfTbv9JqOUnTgFvgv2_Vu5Jy0QiJkCNT4pPkmxHihDU4eoofWw2rrl1GhmnSGYIX2coGGIPuTvDY9JBR_Rtqs5HAWHFG9HlZ35BADQLYTRMocsh5I1EbRVrEI0Ug1Zw_kM8cIAlPVmw2QtL_R1wJOyhppRg_783feMPHYs_0fudEhMI-MP1GEVx5Dwv5YkGtEKQ3W0nbXI_GswhASyGZhG-Ayx-4Lb-RoVcMPBZfI4L2gottOLgXhdtuajccpHWpiOJ-jp5MBKQGG_bueytxD3KISBc_6YFdr6XHB793fL8OI-VHoeLDFadlSyCSNpgfeFgmxJm7jzTlUZDxFbhiz_DpdtpTE0edl02ntx2YzSdNHeplJNn1FMaax-XkrwJJEkUM3sppKfOL-WtP0VO1AS0UXK3sxIERHFZC4_KUqPXia0ZBb_h97WmVM5pms7G_0JzteRAdS3jbvzuesDw_VfQhjMFWOP9mE77z2jo1JB2BldQqMKyoiqd31_aZIQHso4vHBu9GFV_NLRm3RNd8-3pQVH0TR7XIAeX7MCqPPnvgX7Mra7zREjCylMu2Q8ITtLYJvmPIRpu0SgFgo7pgUwP_ZSbHktSUiglc_bNWolvUCbys78Ag_3",
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
//       company: {
//         name: "string",
//         types: "None",
//         minRating: 5,
//         isFavorite: true,
//         isFactorable: true,
//         isTiaMember: true,
//         isTiaCertified: true,
//       },
//       modifiedOnStart: "2019-08-24T14:15:22Z",
//       modifiedOnEnd: "2019-08-24T14:15:22Z",
//       minMileage: 32767,
//       maxMileage: 32767,
//       minOriginRadius: 0,
//       isFavoriteBroker: true,
//       minWeight: 0,
//       minLength: 0,
//       origin: {
//         states: ["string"],
//         city: "string",
//         zipCode: "string",
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
//////////////////////////////////////////////////////

// Test routes
app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

app.get("/apiFun", (req, res) => {
  res.send("API FUN");
});

// Used as a wildcard if something goes wrong
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

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

// run();
