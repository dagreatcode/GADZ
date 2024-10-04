// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const axios = require("axios");
// const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
// Set server PORT
// =============================================================
const PORT = process.env.PORT || 3001;

// Sets up the Express App Middleware
// =============================================================
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(express.static("images"));

app.use(express.json());

// Remove this block
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// // Outside Routes
// =============================================================
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

// TODO: Add console app.

const ServerPort = process.env.SOCKET_IO_SERVER_PORT;
const APIKeyQR = process.env.API_KEY_QR;

app.use(
  cors({
    origin: ServerPort, // Change this to your frontend URL
    // origin: 'http://localhost:3000', // Allow your React app's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.options("*", cors()); // Enable preflight for all routes

const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:3000",
    // origin: "https://gadzconnect.com",
    origin: `${ServerPort}`,
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      // "my-custom-header"
    ],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  // console.log(socket);
  socket.on("sendMessage", async (message) => {
    console.log("MESSAGE", message);
    const { sender, receiver, content } = message;
    try {
      // Basic validation
      if (!sender || !receiver || !content) {
        return socket.emit("error", "Missing required fields");
      }

      const newMessage = await db.Message.create({ sender, receiver, content });
      io.emit("receiveMessage", newMessage); // Emit the saved message
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/messages", (req, res) => {
  // console.log("Thanks for hitting the get info");
  db.Message.findAll()
    .then((messages) => {
      res.json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/api/qr-create", async (req, res) => {
  // console.log("Data from the frontend", req.body);
  // console.log("Back Req.Body", req.body);
  const data = req.body;
  axios
    .post("https://hovercode.com/api/v2/hovercode/create/", data, {
      headers: {
        Authorization: `Token ${APIKeyQR}`,
      },
      timeout: 10000,
    })
    .then((response) => {
      // console.log("Backend Data", response.data);
      res.json(response.data);
    })
    .catch((error) => {
      // console.error(error);
      res.json(response.data);
    })
    .catch((error) => {
      // console.error("Error posting qr:", error);
      res.status(500).send("Internal Server Error");
    });
});
app.get("/api/qr-view", (req, res) => {
  axios
    .get(
      "https://hovercode.com/api/v2/workspace/82140683-32bd-4422-9ff9-7ecec248c952/hovercodes/",
      {
        headers: {
          Authorization: `Token ${APIKeyQR}`,
        },
        timeout: 10000,
      }
    )
    .then((response) => {
      // console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.json(error);
    });
});

app.use(bodyParser.json());

// // Endpoint to create a QR code
app.post("/qr-create", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.hovercode.com/user/qr-create",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error creating QR code:", error);
    res.status(500).json({ error: "Failed to create QR code." });
  }
});

// Endpoint to view QR codes (if needed)
app.get("/qr-view", async (req, res) => {
  try {
    const response = await axios.get("https://api.hovercode.com/user/qr-view");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    res.status(500).json({ error: "Failed to fetch QR codes." });
  }
});

// Test routes to see if their server is talking to the client
// =============================================================
app.get("/api/config", (req, res) => {
  res.json({ success: true });
});
app.get("/apiFun", (req, res) => {
  res.send("API FUN");
  console.log("Have Fun");
  res.end();
});

// Used as a wildcard if something goes wrong
// =============================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to SQL Database
// =============================================================
// Starts the server to begin listening
// =============================================================
// { force: true }
db.sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(
      `🌎 App and Socket.IO server are running on http://localhost:${PORT}`
    );
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});
