// // server.js
// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");
// const path = require("path");
// const db = require("./models");
// const axios = require("axios");
// const bodyParser = require("body-parser");
// const fetch = require("node-fetch");

// // Import controllers and socket handlers
// const handleVideoSocket = require("./config/videoSocket");
// const handleMessageSocket = require("./config/messageSocket");
// const loadController = require("./controllers/LoadController");
// const driverController = require("./controllers/DriverController");
// const messageRouter = require("./controllers/MessageController");
// const LoadsRouter = require("./config/123LoadBoards/123LoadBoards");

// // Environment variables
// const {
//   PORT = 3001,
//   SOCKET_IO_SERVER_PORT,
//   CLIENT_ID,
//   CLIENT_SECRET,
//   TOKEN_123,
//   BEARER_123,
//   URI_123,
//   DEV_URI,
//   USER_AGENT,
// } = process.env;

// // Initialize express app and HTTP server
// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.static("client/build"));
// app.use(express.static("images"));

// // CORS configuration for server and socket.io
// app.use(
//   cors({
//     // origin: SOCKET_IO_SERVER_PORT,
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// // Initialize socket.io with CORS configuration
// const io = socketIo(server, {
//   cors: {
//     // origin: SOCKET_IO_SERVER_PORT,
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Socket.io connections
// io.on("connection", (socket) => {
//   handleVideoSocket(io, socket);
//   handleMessageSocket(io, socket);
// });

// // 123Loads API route
// app.use("/api/123Loads", LoadsRouter);
// // Message API route
// app.use("/api/message", messageRouter);

// // Other API routes
// app.use("/api/agreement", require("./controllers/AgreementController"));
// app.use("/api/user", require("./controllers/UserAPIRoutes"));
// app.use("/api/admin", require("./controllers/AdminController"));
// app.use("/api/newsletter", require("./controllers/NewsLetterController"));
// app.use("/api/it-help", require("./controllers/ITticketController"));
// app.use(
//   "/api/employee-help",
//   require("./controllers/EmployeeTicketController")
// );
// app.use("/api/mail", require("./config/nodeMailer/nodeMailer"));
// app.use("/api/stripe", require("./config/stripe"));

// app.use(require("./routes"));

// // Load and driver routes
// app.get("/api/loads/user/:userId", loadController.getAllUserLoads);
// app.get("/api/drivers/user/:userId", driverController.getAllUserDrivers);
// app.get("/api/loads", loadController.getAllLoads);
// app.get("/api/drivers", driverController.getAllDrivers);
// app.post("/api/loads", loadController.createLoad);
// app.post("/api/drivers", driverController.createDriver);

// // // API endpoint to handle the POST request
// // app.post("/api/load-search", async (req, res) => {
// //   const {
// //     originCity,
// //     originState,
// //     radius,
// //     destinationType,
// //     equipmentTypes,
// //     minWeight,
// //     maxMileage,
// //     pickupDate,
// //     companyRating,
// //     modifiedStartDate,
// //     modifiedEndDate,
// //   } = req.body;

// //   try {
// //     // Get the access token from the request headers or session (depending on your app)
// //     const bearerToken = req.headers.authorization?.split(" ")[1];

// //     if (!bearerToken) {
// //       return res.status(400).send("Authorization token is missing");
// //     }

// //     // Structure the request body for the load search API
// //     const requestBody = {
// //       metadata: {
// //         limit: 10,
// //         sortBy: { field: "Origin", direction: "Ascending" },
// //         fields: "all",
// //         type: "Regular",
// //       },
// //       includeWithGreaterPickupDates: true,
// //       origin: {
// //         city: originCity,
// //         states: [originState],
// //         radius: radius,
// //         type: "City",
// //       },
// //       destination: {
// //         type: destinationType,
// //       },
// //       equipmentTypes: equipmentTypes,
// //       minWeight: minWeight,
// //       maxMileage: maxMileage,
// //       pickupDates: [pickupDate],
// //       company: {
// //         minRating: companyRating,
// //       },
// //       modifiedOnStart: modifiedStartDate,
// //       modifiedOnEnd: modifiedEndDate,
// //     };

// //     // Send the structured request to the external API
// //     const loadResp = await fetch(
// //       "https://api.dev.123loadboard.com/loads/search",
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "123LB-Correlation-Id": "123GADZ",
// //           "123LB-Api-Version": "1.3",
// //           "User-Agent": USER_AGENT,
// //           "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
// //           Authorization: `Bearer ${bearerToken}`, // Pass the bearer token
// //         },
// //         body: JSON.stringify(requestBody),
// //       }
// //     );

// //     const loadData = await loadResp.json();

// //     if (loadResp.ok) {
// //       return res.json(loadData);
// //     } else {
// //       console.error("Load Search API Error:", loadData);
// //       return res.status(400).json({ error: "Failed to fetch load data" });
// //     }
// //   } catch (error) {
// //     console.error("Error during load search:", error);
// //     res.status(500).json({ error: "An error occurred during load search" });
// //   }
// // });

// // // OAuth Flow - Authorization Route
// // app.get("/authorize", async (req, res) => {
// //   const query = new URLSearchParams({
// //     response_type: "code",
// //     client_id: CLIENT_ID,
// //     redirect_uri: DEV_URI,
// //     scope: "loadsearching",
// //     state: "string",
// //     login_hint: "gadzconnect_dev",
// //   }).toString();

// //   res.redirect(`${URI_123}/authorize?${query}`);
// // });

// // Route to handle token exchange and fetch loads
// // app.get("/auth/callback", async (req, res) => {
// //   try {
// //     const authCode = req.query.code;
// //     console.log("Authorization Code:", authCode);

// //     // Exchange authorization code for access token
// //     const formData = new URLSearchParams({
// //       grant_type: "authorization_code",
// //       code: authCode,
// //       client_id: CLIENT_ID,
// //       redirect_uri: DEV_URI,
// //     }).toString();

// //     const tokenResp = await fetch(`${URI_123}/token`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/x-www-form-urlencoded",
// //         "123LB-Api-Version": "1.3",
// //         "User-Agent": "gadzconnect_dev",
// //         "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
// //         Authorization:
// //           "Basic " +
// //           Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
// //       },
// //       body: formData,
// //     });

// //     const tokenData = await tokenResp.json();
// //     console.log("Access Token Response:", tokenData);

// //     if (tokenData.access_token) {
// //       const bearerToken = tokenData.access_token;

// //       // Use access token to fetch loads
// //       const loadResp = await fetch(`${URI_123}/loads/search`, {
// //         method: "POST",
// //         headers: {
// //           "123LB-Correlation-Id": "123GADZ",
// //           "Content-Type": "application/json",
// //           "123LB-Api-Version": "1.3",
// //           "User-Agent": USER_AGENT,
// //           "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
// //           Authorization: `Bearer ${bearerToken}`,
// //         },
// //         body: JSON.stringify({
// //           metadata: {
// //             limit: 10,
// //             sortBy: { field: "Origin", direction: "Ascending" },
// //             fields: "all",
// //             type: "Regular",
// //           },
// //           includeWithGreaterPickupDates: true,
// //           origin: {
// //             states: ["IL"],
// //             city: "Chicago",
// //             radius: 100,
// //             type: "City",
// //           },
// //           destination: {
// //             type: "Anywhere",
// //           },
// //           equipmentTypes: ["Van", "Flatbed", "Reefer"],
// //           includeLoadsWithoutWeight: true,
// //           includeLoadsWithoutLength: true,
// //         }),
// //       });

// //       const loadData = await loadResp.json();
// //       console.log("Load Response:", loadData);
// //       res.send(loadData);
// //     } else {
// //       console.error("Access token not found in response:", tokenData);
// //       res.status(400).send("Failed to retrieve access token.");
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("An error occurred during the process.");
// //   }
// // });
// // // Route to handle token exchange ONLY (no auto-search)
// // app.get("/auth/callback", async (req, res) => {
// //   try {
// //     const authCode = req.query.code;
// //     console.log("Authorization Code:", authCode);

// //     const formData = new URLSearchParams({
// //       grant_type: "authorization_code",
// //       code: authCode,
// //       client_id: CLIENT_ID,
// //       redirect_uri: DEV_URI,
// //     }).toString();

// //     const tokenResp = await fetch(`${URI_123}/token`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/x-www-form-urlencoded",
// //         "123LB-Api-Version": "1.3",
// //         "User-Agent": USER_AGENT,
// //         "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
// //         Authorization:
// //           "Basic " +
// //           Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
// //       },
// //       body: formData,
// //     });

// //     const tokenData = await tokenResp.json();
// //     console.log("Access Token Response:", tokenData);

// //     if (!tokenData.access_token) {
// //       console.error("Access token missing in response:", tokenData);
// //       return res.status(400).send("Failed to retrieve access token.");
// //     }

// //     const bearerToken = tokenData.access_token;

// //     // ✅ Option 1: Send token back as a cookie (recommended)
// //     res.cookie("lb_access_token", bearerToken, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "Lax",
// //       maxAge: 3600 * 1000, // 1 hour
// //     });

// //     // ✅ Option 2: Also send token in response body (frontend can store it)
// //     res.json({
// //       success: true,
// //       message: "Authorization successful",
// //       access_token: bearerToken,
// //     });

// //   } catch (error) {
// //     console.error("Error in /auth/callback:", error);
// //     res.status(500).json({ error: "An error occurred during token exchange" });
// //   }
// // });

// // Test routes
// app.get("/api/config", (req, res) => {
//   res.json({ success: true });
// });

// app.get("/apiFun", (req, res) => {
//   res.send("API FUN");
// });

// // Serve React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// // { alter: true } { force: true }
// // Database connection and server startup
// db.sequelize
//   .sync({})
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err.message);
//   });


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
const fetch = require("node-fetch");

// Controllers and Routers
const handleVideoSocket = require("./config/videoSocket");
const handleMessageSocket = require("./config/messageSocket");
const loadController = require("./controllers/LoadController");
const driverController = require("./controllers/DriverController");
const messageRouter = require("./controllers/MessageController");
const LoadsRouter = require("./config/123LoadBoards/123LoadBoards");

const {
  PORT = 3001,
  CLIENT_ID,
  CLIENT_SECRET,
  USER_AGENT,
  URI_123,
  DEV_URI,
} = process.env;

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("client/build"));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://gadzconnect.com",
  "https://www.gadzconnect.com",
  "https://api.gadzconnect.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Socket.io
// const io = socketIo(server, {
//   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
// });
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  handleVideoSocket(io, socket);
  handleMessageSocket(io, socket);
});

// ✅ 123 Loadboard Routes
app.use("/api/123Loads", LoadsRouter);

// ✅ Legacy alias for old frontend routes
app.post("/api/load-search", async (req, res, next) => {
  req.url = "/search";
  LoadsRouter.handle(req, res, next);
});

// Route to handle token exchange and fetch loads
app.get("/auth/callback", async (req, res) => {
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
        "User-Agent": "gadzconnect_dev",
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
      res.send(loadData);
    } else {
      console.error("Access token not found in response:", tokenData);
      res.status(400).send("Failed to retrieve access token.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during the process.");
  }
});

// // Route to handle token exchange and fetch loads (with frontend data)
// app.post("/auth/callback/test", async (req, res) => {
//   try {
//     const { code } = req.query;
//     const searchData = req.body; // Data sent from the frontend
//     console.log("Authorization Code:", code);
//     console.log("Frontend Search Data:", searchData);

//     if (!code) {
//       return res.status(400).send({ error: "Missing authorization code" });
//     }

//     // Exchange authorization code for access token
//     const formData = new URLSearchParams({
//       grant_type: "authorization_code",
//       code,
//       client_id: CLIENT_ID,
//       redirect_uri: DEV_URI,
//     }).toString();

//     const tokenResp = await fetch(`${URI_123}/token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": "gadzconnect_dev",
//         "123LB-AID": LOADBOARD_AID,
//         Authorization:
//           "Basic " +
//           Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//       },
//       body: formData,
//     });

//     const tokenData = await tokenResp.json();
//     console.log("Access Token Response:", tokenData);

//     if (!tokenData.access_token) {
//       console.error("Access token not found in response:", tokenData);
//       return res.status(400).send({ error: "Failed to retrieve access token." });
//     }

//     const bearerToken = tokenData.access_token;

//     // Use access token to fetch loads, using frontend data dynamically
//     const loadResp = await fetch(`${URI_123}/loads/search`, {
//       method: "POST",
//       headers: {
//         "123LB-Correlation-Id": "123GADZ",
//         "Content-Type": "application/json",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": LOADBOARD_AID,
//         Authorization: `Bearer ${bearerToken}`,
//       },
//       body: JSON.stringify({
//         // Merge defaults with user-provided search data
//         metadata: {
//           limit: searchData?.limit || 10,
//           sortBy: searchData?.sortBy || { field: "Origin", direction: "Ascending" },
//           fields: "all",
//           type: "Regular",
//         },
//         includeWithGreaterPickupDates: true,
//         origin: {
//           states: searchData?.origin?.states || ["IL"],
//           city: searchData?.origin?.city || "Chicago",
//           radius: searchData?.origin?.radius || 100,
//           type: searchData?.origin?.type || "City",
//         },
//         destination: searchData?.destination || { type: "Anywhere" },
//         equipmentTypes:
//           searchData?.equipmentTypes?.length > 0
//             ? searchData.equipmentTypes
//             : ["Van", "Flatbed", "Reefer"],
//         includeLoadsWithoutWeight: !!searchData?.includeLoadsWithoutWeight,
//         includeLoadsWithoutLength: !!searchData?.includeLoadsWithoutLength,
//       }),
//     });

//     const loadData = await loadResp.json();
//     console.log("Load Response:", loadData);

//     res.send(loadData);
//   } catch (error) {
//     console.error("Error during /auth/callback:", error);
//     res.status(500).send({ error: "An error occurred during the process." });
//   }
// });

// // Route to handle token exchange and fetch loads dynamically
// app.post("/auth/callMeBack", async (req, res) => {
//   try {
//     const authCode = req.query.code || req.body.code;
//     const searchData = req.body;

//     console.log("Authorization Code:", authCode);
//     console.log("Search Data from Frontend:", searchData);

//     if (!authCode) {
//       return res.status(400).json({ error: "Missing authorization code." });
//     }

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
//         "User-Agent": "gadzconnect_dev",
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
//       return res.status(400).json({ error: "Failed to retrieve access token." });
//     }

//     const bearerToken = tokenData.access_token;

//     // Use access token to fetch loads with frontend data
//     const loadResp = await fetch(`${URI_123}/loads/search`, {
//       method: "POST",
//       headers: {
//         "123LB-Correlation-Id": "123GADZ",
//         "Content-Type": "application/json",
//         "123LB-Api-Version": "1.3",
//         "User-Agent": USER_AGENT,
//         "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//         Authorization: `Bearer ${bearerToken}`,
//       },
//       body: JSON.stringify({
//         metadata: {
//           limit: searchData.limit || 10,
//           sortBy: { field: "Origin", direction: "Ascending" },
//           fields: "all",
//           type: "Regular",
//         },
//         includeWithGreaterPickupDates: true,
//         origin: {
//           states: [searchData.originState || "IL"],
//           city: searchData.originCity || "Chicago",
//           radius: parseInt(searchData.radius || 100),
//           type: "City",
//         },
//         destination: {
//           type: searchData.destinationType || "Anywhere",
//         },
//         equipmentTypes: searchData.equipmentTypes
//           ? [searchData.equipmentTypes]
//           : ["Van", "Flatbed", "Reefer"],
//         includeLoadsWithoutWeight: true,
//         includeLoadsWithoutLength: true,
//       }),
//     });

//     const loadData = await loadResp.json();
//     console.log("Load Response:", loadData);

//     res.status(200).json(loadData);
//   } catch (error) {
//     console.error("Error in /auth/callback:", error);
//     res.status(500).json({ error: "An error occurred during the process." });
//   }
// });
app.post("/auth/callMeBack", async (req, res) => {
  try {
    const { code, ...searchData } = req.body;
    console.log("Authorization Code:", code);
    console.log("Search Data from Frontend:", searchData);

    if (!code) return res.status(400).json({ error: "Missing authorization code" });

    // 1️⃣ Exchange authorization code for access token
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code,
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
    if (!tokenData.access_token)
      return res.status(400).json({ error: "Failed to retrieve access token." });

    const bearerToken = tokenData.access_token;

    // 2️⃣ Fetch loads using user-provided search data
    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": "GadzConnect-LoadSearch/1.0.0 (support@gadzconnect.com)",
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        "123LB-Correlation-Id": "123GADZ",
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
          states: [searchData.originState],
          city: searchData.originCity,
          radius: parseInt(searchData.radius || 100),
          type: "City",
        },
        destination: { type: searchData.destinationType || "Anywhere" },
        equipmentTypes: searchData.equipmentTypes
          ? [searchData.equipmentTypes]
          : ["Van", "Flatbed", "Reefer"],
        includeLoadsWithoutWeight: true,
        includeLoadsWithoutLength: true,
      }),
    });

    const loadData = await loadResp.json();
    res.status(200).json(loadData);
  } catch (error) {
    console.error("Error in /auth/callMeBack:", error);
    res.status(500).json({ error: "Server error during callback process." });
  }
});

// Route to handle token exchange and fetch loads dynamically
app.post("/api/loadboard/auth/callback/test", async (req, res) => {
  try {
    const { code } = req.query; // from redirect URL
    const searchData = req.body; // from frontend form

    console.log("Authorization Code:", code);
    console.log("Search Data from Frontend:", searchData);

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // Exchange authorization code for access token
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: CLIENT_ID,
      redirect_uri: DEV_URI,
    }).toString();

    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": "GadzConnect-LoadSearch/1.0.0 (support@gadzconnect.com)",
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    console.log("Access Token Response:", tokenData);

    if (!tokenData.access_token) {
      return res.status(400).json({ error: "Failed to retrieve access token." });
    }

    const bearerToken = tokenData.access_token;

    // Use access token to fetch loads with user input
    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": "GadzConnect-LoadSearch/1.0.0 (support@gadzconnect.com)",
        "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
        "123LB-Correlation-Id": "123GADZ",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        metadata: {
          limit: searchData.limit || 10,
          sortBy: { field: "Origin", direction: "Ascending" },
          fields: "all",
          type: "Regular",
        },
        equipmentSpecifications: "None",
        includeWithGreaterPickupDates: true,
        maxAge: 2147483647,
        maxExtraDrops: 2147483647,
        hasTeam: true,
        hasRate: true,
        company: {
          name: "GadzConnect",
          types: "None",
          minRating: 5,
          isFavorite: true,
          isFactorable: true,
          isTiaMember: false,
          isTiaCertified: false,
        },
        modifiedOnStart: searchData.modifiedStartDate || "2025-09-27T00:00:00Z",
        modifiedOnEnd: searchData.modifiedEndDate || "2025-10-27T00:00:00Z",
        minMileage: 0,
        maxMileage: parseInt(searchData.maxMileage || 500),
        minOriginRadius: parseFloat(searchData.radius || 100),
        minWeight: parseInt(searchData.minWeight || 0),
        origin: {
          states: [searchData.originState],
          city: searchData.originCity,
          radius: parseInt(searchData.radius || 100),
          type: "City",
        },
        destination: {
          type: searchData.destinationType || "Anywhere",
        },
        equipmentTypes: searchData.equipmentTypes
          ? [searchData.equipmentTypes]
          : ["Van", "Flatbed", "Reefer"],
        pickupDates: [searchData.pickupDate || new Date().toISOString()],
        loadSize: "Tl",
        includeLoadsWithoutWeight: true,
        includeLoadsWithoutLength: true,
      }),
    });

    const loadData = await loadResp.json();
    console.log("Load Response:", loadData);

    res.status(200).json(loadData);
  } catch (error) {
    console.error("Error in /auth/callback:", error);
    res.status(500).json({ error: "Server error during callback process." });
  }
});

// Route to handle token exchange and fetch loads dynamically
app.post("/api/loadboard/auth/callback", async (req, res) => {
  try {
    const { code } = req.query; // from redirect URL
    const searchData = req.body; // from frontend form

    console.log("Authorization Code:", code);
    console.log("Search Data from Frontend:", searchData);

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // Exchange authorization code for access token
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code,
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
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    console.log("Access Token Response:", tokenData);

    if (!tokenData.access_token) {
      return res.status(400).json({ error: "Failed to retrieve access token." });
    }

    const bearerToken = tokenData.access_token;

    // Use access token to fetch loads with user input
    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "123LB-Correlation-Id": "123GADZ",
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "User-Agent": "gadzconnect_dev",
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
          city: searchData.originCity,
          states: [searchData.originState],
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
    res.status(500).json({ error: "Server error during callback process." });
  }
});

// Combined route: handle token exchange + dynamic search in one step
app.post("/api/123Loads/callback", async (req, res) => {
  try {
    const authCode = req.query.code;
    const formOptions = req.body; // Frontend form data
    console.log("Authorization Code:", authCode);
    console.log("Form Options:", formOptions);

    if (!authCode) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    // Step 1: Exchange authorization code for access token
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
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
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

    // Step 2: Build dynamic search body using frontend data
    const searchBody = {
      metadata: {
        limit: Number(formOptions.limit) || 10,
        sortBy: formOptions.sortBy || { field: "Origin", direction: "Ascending" },
        fields: "all",
        type: "Regular",
      },
      includeWithGreaterPickupDates: true,
      origin: {
        states: formOptions.originState ? [formOptions.originState] : [],
        city: formOptions.originCity || "",
        radius: Number(formOptions.radius) || 100,
        type: formOptions.originType || "City",
      },
      destination: {
        type: formOptions.destinationType || "Anywhere",
      },
      equipmentTypes: formOptions.equipmentTypes?.length
        ? formOptions.equipmentTypes
        : ["Van", "Flatbed", "Reefer"],
      includeLoadsWithoutWeight: true,
      includeLoadsWithoutLength: true,
      weight: formOptions.minWeight
        ? { min: Number(formOptions.minWeight) }
        : undefined,
      companyRating: formOptions.companyRating || undefined,
    };

    // Step 3: Use access token to fetch loads dynamically
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
      body: JSON.stringify(searchBody),
    });

    const loadData = await loadResp.json();
    console.log("Load Search Response:", loadData);

    // Step 4: Return combined token + results to frontend
    res.json({
      access_token: bearerToken,
      search: loadData,
    });
  } catch (error) {
    console.error("Error during 123Loadboard callback:", error);
    res.status(500).json({ error: "An error occurred during the process." });
  }
});

// Message API route
app.use("/api/message", messageRouter);

// Other Controllers
app.use("/api/agreement", require("./controllers/AgreementController"));
app.use("/api/user", require("./controllers/UserAPIRoutes"));
app.use("/api/admin", require("./controllers/AdminController"));
app.use("/api/newsletter", require("./controllers/NewsLetterController"));
app.use("/api/it-help", require("./controllers/ITticketController"));
app.use("/api/employee-help", require("./controllers/EmployeeTicketController"));
app.use("/api/mail", require("./config/nodeMailer/nodeMailer"));
app.use("/api/stripe", require("./config/stripe"));
app.use(require("./routes"));

// ✅ Load and driver endpoints
app.get("/api/loads/user/:userId", loadController.getAllUserLoads);
app.get("/api/drivers/user/:userId", driverController.getAllUserDrivers);
app.get("/api/loads", loadController.getAllLoads);
app.get("/api/drivers", driverController.getAllDrivers);
app.post("/api/loads", loadController.createLoad);
app.post("/api/drivers", driverController.createDriver);

// ✅ Test route
app.get("/api/config", (req, res) => res.json({ success: true }));

// ✅ Serve React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ✅ Database + Server Start
db.sequelize
  .sync({})
  .then(() => {
    server.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB sync error:", err.message));
// { alter: true } { force: true }
