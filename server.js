// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const path = require("path");
const AgreementController = require("./controllers/AgreementController.js");
const UserController = require("./controllers/UserAPIRoutes.js");
const AdminController = require("./controllers/AdminController.js");
const ITticketController = require("./controllers/ITticketController.js");
const EmployeeTicketController = require("./controllers/EmployeeTicketController.js");
const Message = require("./controllers/MessageController.js");
// const Chat = require("./config/chat.js");
// const inquirer = require("inquirer"); // Create Console App
const routes = require("./routes");

// Set server PORT
// =============================================================
const PORT = process.env.PORT || 3001;

// Sets up the Express App Middleware
// =============================================================
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku/render)
// =============================================================
app.use(express.static("client/build"));

app.use(express.static("images"));

// Connect to SQL Database
// =============================================================
var db = require("./models");

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

// // Outside Routes
// =============================================================
app.use("/api/agreement", AgreementController);
app.use("/api/user", UserController);
app.use("/api/admin", AdminController);
app.use("/api/it-help", ITticketController);
app.use("/api/employee-help", EmployeeTicketController);
app.use(routes);
app.use("/api/message", Message);
app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
// app.use("/api/chat/", require("./config/chat.js"));
// app.use("/api/video-chat/", require("./config/videochat.js"));
// app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
// app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));

// app.use(AuthController);
// require("./routes/post-api-routes.js")(app);

// const messages = [];

app.use(express.json());

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("sendMessage", (message) => {
//     messages.push(message);

//     io.emit("receiveMessage", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (message) => {
    try {
      // Basic validation
      if (!message.content || !message.sender || !message.receiver) {
        return socket.emit("error", "Missing required fields");
      }

      const newMessage = await db.Message.create(message);
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

app.post("/", (req, res) => {
  console.log("Hit2", req.body);
  res.send("Message received");
});

// app.post("/", (req, res) => {
//   io.on("connection", (socket) => {
//     console.log("New client connected");
//     console.log("Hit2", req.body);
//     socket.on("sendMessage", (message) => {
//       // Save message to the database
//       db.Message.create(message)
//         .then((newMessage) => {
//           io.emit("receiveMessage", newMessage); // Emit the saved message
//         })
//         .catch((error) => {
//           console.error("Error saving message:", error);
//         });
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });
// });

app.get("/messages", (req, res) => {
  db.Message.findAll()
    .then((messages) => {
      res.json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).send("Internal Server Error");
    });
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// TODO: Add console app.

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

// Starts the server to begin listening
// =============================================================
// { force: true }
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`🌎 App is running on http://localhost:${PORT}`);
  });
});
