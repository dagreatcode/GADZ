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
const bodyParser = require("body-parser");
const handleVideoSocket = require("./config/videoSocket");
const handleMessageSocket = require("./config/messageSocket");
const app = express();
const server = http.createServer(app);

// Set server PORT
// =============================================================
const PORT = process.env.PORT || 3001;

// Sets up the Express App Middleware
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(express.static("images"));
app.use(bodyParser.json());

const ServerPort = process.env.SOCKET_IO_SERVER_PORT;
const APIKeyQR = process.env.API_KEY_QR;

app.use(
  cors({
    origin: ServerPort, // Change this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.options("*", cors()); // Enable preflight for all routes

const io = socketIo(server, {
  cors: {
    origin: `${ServerPort}`, // Allow connections from your client
    methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  },
});
// Socket.IO connection handling
io.on("connection", (socket) => {
  handleVideoSocket(io, socket);
  handleMessageSocket(io, socket);
});

// // Socket.IO connection handling
// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   // Emit user ID back to the client
//   socket.emit("me", socket.id);

//   // Handle client disconnection
//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//     socket.broadcast.emit("callEnded"); // Notify other clients that the call has ended
//   });

//   // Video call functionality
//   socket.on("callUser", ({ userToCall, signalData, from }) => {
//     console.log(`${from} is calling ${userToCall}`);
//     io.to(userToCall).emit("callUser", { signal: signalData, from });
//   });

//   socket.on("answerCall", (data) => {
//     console.log(`Call answered by ${data.to}`);
//     io.to(data.to).emit("callAccepted", data.signal);
//   });

//   // Messaging feature
//   socket.on("sendMessage", async (message) => {
//     console.log("MESSAGE", message);
//     const { sender, receiver, content } = message;

//     try {
//       // Basic validation
//       if (!sender || !receiver || !content) {
//         return socket.emit("error", "Missing required fields");
//       }

//       // Save the new message to the database
//       const newMessage = await db.Message.create({ sender, receiver, content });
//       io.emit("receiveMessage", newMessage); // Emit the saved message to all clients
//     } catch (error) {
//       console.error("Error saving message:", error);
//       socket.emit("error", "Internal Server Error");
//     }
//   });

//   // Handle user joining
//   socket.on("userJoined", (userId) => {
//     console.log("User joined:", userId);
//   });

//   // Handle sending signals for video calls
//   socket.on("sendSignal", ({ signal, to }) => {
//     socket.to(to).emit("receiveSignal", { signal, from: socket.id });
//   });

//   // Handle user leaving the room
//   socket.on("leaveRoom", (userId) => {
//     console.log(`${userId} left the room`);
//     socket.leave(userId); // Optionally, implement any additional logic needed on leaving
//   });
// });

// Outside Routes
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

// API endpoints for QR code creation and viewing
app.post("/api/qr-create", async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(
      "https://hovercode.com/api/v2/hovercode/create/",
      data,
      {
        headers: {
          Authorization: `Token ${APIKeyQR}`,
        },
        timeout: 10000,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error posting QR:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/qr-view", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hovercode.com/api/v2/workspace/82140683-32bd-4422-9ff9-7ecec248c952/hovercodes/",
      {
        headers: {
          Authorization: `Token ${APIKeyQR}`,
        },
        timeout: 10000,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    res.status(500).send("Internal Server Error");
  }
});

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

// Connect to SQL Database
db.sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `🌎 App and Socket.IO server are running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err.message);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
