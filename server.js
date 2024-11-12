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
const LoadsRouter = require("./config/123LoadBoards/123LoadBoards");
const messageRouter = require("./controllers/MessageController");

// Environment variables
const { PORT = 3001, SOCKET_IO_SERVER_PORT } = process.env;

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

// API endpoint to handle the POST request
app.post("/api/load-search", async (req, res) => {
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

  // Structure the request data as needed
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
      radius: radius,
      type: "City",
    },
    destination: {
      type: destinationType,
    },
    equipmentTypes: equipmentTypes,
    minWeight: minWeight,
    maxMileage: maxMileage,
    pickupDates: [pickupDate],
    company: {
      minRating: companyRating,
    },
    modifiedOnStart: modifiedStartDate,
    modifiedOnEnd: modifiedEndDate,
  };

  try {
    // Send the structured request to the external API or perform internal logic
    const response = await fetch(
      "https://api.dev.123loadboard.com/loads/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <YOUR_TOKEN_HERE>",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching loads data" });
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
