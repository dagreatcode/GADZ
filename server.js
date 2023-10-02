// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const path = require("path");
const UserController = require("./controllers/UserAPIRoutes.js");
const AdminController = require("./controllers/AdminController.js");
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
app.use("/api/user", UserController);
app.use("/api/admin", AdminController);
app.use(routes);
// app.use(AuthController);
// require("./routes/post-api-routes.js")(app);

// TODO: Add console app.

// Test routes to see if ther server is talking to the client
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
