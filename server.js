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

const UserAPIRoutes = require("./routes/UserAPIRoutes");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images"))); // Serve uploaded images
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

// // Route to handle token exchange and fetch loads
// app.get("/auth/callback", async (req, res) => {
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
//         "User-Agent": "gadzconnect_dev",
//         "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//         Authorization:
//           "Basic " +
//           Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//       },
//       body: formData,
//     });

//     const tokenData = await tokenResp.json();
//     console.log("Access Token Response:", tokenData);

//     if (tokenData.access_token) {
//       const bearerToken = tokenData.access_token;

//       // Use access token to fetch loads
//       const loadResp = await fetch(`${URI_123}/loads/search`, {
//         method: "POST",
//         headers: {
//           "123LB-Correlation-Id": "123GADZ",
//           "Content-Type": "application/json",
//           "123LB-Api-Version": "1.3",
//           "User-Agent": USER_AGENT,
//           "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//           Authorization: `Bearer ${bearerToken}`,
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
//             states: ["IL"],
//             city: "Chicago",
//             radius: 100,
//             type: "City",
//           },
//           destination: {
//             type: "Anywhere",
//           },
//           equipmentTypes: ["Van", "Flatbed", "Reefer"],
//           includeLoadsWithoutWeight: true,
//           includeLoadsWithoutLength: true,
//         }),
//       });

//       const loadData = await loadResp.json();
//       console.log("Load Response:", loadData);
//       res.send(loadData);
//     } else {
//       console.error("Access token not found in response:", tokenData);
//       res.status(400).send("Failed to retrieve access token.");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred during the process.");
//   }
// });

// Route to handle token exchange and fetch loads dynamically
app.post("/auth/callMeBack", async (req, res) => {
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
