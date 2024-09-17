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

// // Outside Routes
// =============================================================
app.use("/api/agreement", AgreementController);
app.use("/api/user", UserController);
app.use("/api/admin", AdminController);
app.use("/api/it-help", ITticketController);
app.use("/api/employee-help", EmployeeTicketController);
app.use(routes);
app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
// app.use(AuthController);
// require("./routes/post-api-routes.js")(app);

// server.js
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
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
