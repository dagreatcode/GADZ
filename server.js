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

// Import controllers and socket handlers
const handleVideoSocket = require("./config/videoSocket");
const handleMessageSocket = require("./config/messageSocket");
const loadController = require("./controllers/LoadController");
const driverController = require("./controllers/DriverController");
const messageRouter = require("./controllers/MessageController");
const LoadsRouter = require("./config/123LoadBoards/123LoadBoards");

// Environment variables
const {
  PORT = 3001,
  SOCKET_IO_SERVER_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  // TOKEN_123,
  // BEARER_123,
  URI_123,
  DEV_URI,
  // USER_AGENT,
} = process.env;

// Initialize express app and HTTP server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("client/build"));
app.use(express.static("images"));

// CORS configuration for server and socket.io
app.use(
  cors({
    origin: SOCKET_IO_SERVER_PORT,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Initialize socket.io with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: SOCKET_IO_SERVER_PORT,
    methods: ["GET", "POST"],
  },
});

// Socket.io connections
io.on("connection", (socket) => {
  handleVideoSocket(io, socket);
  handleMessageSocket(io, socket);
});

// 123Loads API route
app.use("/api/123Loads", LoadsRouter);
// Message API route
app.use("/api/message", messageRouter);

// Other API routes
app.use("/api/agreement", require("./controllers/AgreementController"));
app.use("/api/user", require("./controllers/UserAPIRoutes"));
app.use("/api/admin", require("./controllers/AdminController"));
app.use("/api/newsletter", require("./controllers/NewsLetterController"));
app.use("/api/it-help", require("./controllers/ITticketController"));
app.use(
  "/api/employee-help",
  require("./controllers/EmployeeTicketController")
);
app.use("/api/mail", require("./config/nodeMailer/nodeMailer"));
app.use("/api/stripe", require("./config/stripe"));

app.use(require("./routes"));

// Load and driver routes
app.get("/api/loads/user/:userId", loadController.getAllUserLoads);
app.get("/api/drivers/user/:userId", driverController.getAllUserDrivers);
app.get("/api/loads", loadController.getAllLoads);
app.get("/api/drivers", driverController.getAllDrivers);
app.post("/api/loads", loadController.createLoad);
app.post("/api/drivers", driverController.createDriver);

// Load Search Route

app.post("/api/load-search", async (req, res) => {
  console.log("Hit /api/load-search endpoint");

  const {
    originCity,
    originState,
    radius,
    destinationType = "Anywhere",
    equipmentTypes,
    minWeight,
    maxMileage,
    pickupDate,
    companyRating,
    modifiedStartDate,
    modifiedEndDate,
  } = req.body;
  console.log("Hit2 /api/load-search endpoint");

  // Basic validation for required fields
  if (!originCity || !originState || !radius) {
    return res.status(400).json({ error: "Required fields are missing" });
  }
  console.log("Hit3 /api/load-search endpoint");

  // Build the request payload
  const requestBody = {
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
      radius: parseInt(radius, 10),
      type: "City",
    },
    destination: { type: destinationType },
    equipmentTypes: equipmentTypes ? equipmentTypes.split(", ") : ["Van"],
    includeLoadsWithoutWeight: true,
    includeLoadsWithoutLength: true,
  };
  console.log("Hit4 /api/load-search endpoint");

  if (pickupDate) requestBody.pickupDates = [pickupDate];
  if (minWeight) requestBody.minWeight = minWeight;
  if (maxMileage) requestBody.maxMileage = maxMileage;
  if (companyRating) requestBody.company = { minRating: companyRating };
  if (modifiedStartDate) requestBody.modifiedOnStart = modifiedStartDate;
  if (modifiedEndDate) requestBody.modifiedOnEnd = modifiedEndDate;
  console.log("Hit5 /api/load-search endpoint");

  try {
    // Step 1: Fetch Authorization Token
    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "123LB-Api-Version": "1.3",
        "User-Agent": "gadzconnect_dev",
        "123LB-AID": process.env.LOADBOARD_AID || "default_aid",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });
    console.log("Hit6 /api/load-search endpoint");

    if (!tokenResp.ok) {
      const errorData = await tokenResp.json();
      console.error("Token Request Error:", errorData);
      return res.status(400).json({
        error: "Failed to retrieve authorization token",
        details: errorData.message || "No details provided",
      });
    }
    console.log("Hit7 /api/load-search endpoint");

    const { access_token: bearerToken } = await tokenResp.json();
    console.log("Hit8 /api/load-search endpoint");

    // Step 2: Use access token to fetch loads
    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "123LB-Correlation-Id": "123GADZ",
        "123LB-Api-Version": "1.3",
        "User-Agent": process.env.USER_AGENT || "default_user_agent",
        "123LB-AID": process.env.LOADBOARD_AID || "default_aid",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    console.log("Hit9 /api/load-search endpoint");

    const loadData = await loadResp.json();
    if (loadResp.ok) {
      return res.json(loadData);
    } else {
      console.error("Load Search API Error:", loadData);
      return res.status(400).json({
        error: "Failed to fetch load data",
        details: loadData.message || "No details provided",
      });
    }
  } catch (error) {
    console.error("Error during load search:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during load search" });
  }
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
          Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64"),
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
          "User-Agent": process.env.USER_AGENT,
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

app.use(express.json());

// Step 1: Get Authorization Code (Login Part - Triggered from the Frontend)
app.get("/auth/authorize", (req, res) => {
  const authUri = `${URI_123}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${DEV_URI}`;
  res.redirect(authUri);
});

// Step 2: Exchange Authorization Code for Access and Refresh Tokens
app.post("/auth/token", async (req, res) => {
  const { code } = req.body;

  const formData = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: CLIENT_ID,
    redirect_uri: DEV_URI,
  }).toString();

  try {
    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    res.json(tokenData); // { access_token, refresh_token, expires_in, ... }
  } catch (error) {
    res.status(500).json({ error: "Token exchange failed." });
  }
});

// Step 3: Refresh Access Token Using Refresh Token
app.post("/auth/refresh-token", async (req, res) => {
  const { refresh_token } = req.body;

  const formData = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
    client_id: CLIENT_ID,
  }).toString();

  try {
    const tokenResp = await fetch(`${URI_123}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: formData,
    });

    const tokenData = await tokenResp.json();
    res.json(tokenData); // New access_token and refresh_token
  } catch (error) {
    res.status(500).json({ error: "Failed to refresh access token." });
  }
});

// Load Search Route (Automated Part)
app.post("/api/load-search", async (req, res) => {
  const { access_token } = req.headers;
  const { originCity, originState, radius, destinationType, equipmentTypes } =
    req.body;

  const requestBody = {
    metadata: {
      limit: 10,
      sortBy: { field: "Origin", direction: "Ascending" },
      fields: "all",
      type: "Regular",
    },
    includeWithGreaterPickupDates: true,
    origin: {
      states: [originState],
      city: originCity,
      radius,
      type: "City",
    },
    destination: { type: destinationType || "Anywhere" },
    equipmentTypes: equipmentTypes.split(", "),
    includeLoadsWithoutWeight: true,
    includeLoadsWithoutLength: true,
  };

  try {
    const loadResp = await fetch(`${URI_123}/loads/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "123LB-Api-Version": "1.3",
        "123LB-Correlation-Id": "123GADZ",
        "User-Agent": process.env.USER_AGENT,
        "123LB-AID": process.env.LOADBOARD_AID,
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const loadData = await loadResp.json();
    res.json(loadData);
  } catch (error) {
    res.status(500).json({ error: "Load search failed." });
  }
});

// Test routes
app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

app.get("/apiFun", (req, res) => {
  res.send("API FUN");
});

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// { alter: true } { force: true }
// Database connection and server startup
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
