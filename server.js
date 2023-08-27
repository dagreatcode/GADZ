// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const path = require("path");
const mysql = require("mysql");
// const Sequelize = require("sequelize"); // Upgrade to MySQL2
// const inquirer = require("inquirer"); // Create Console App
// TODO: upgrade to MySQL2, Create Console App, Finish & Divided out routes and models

// Set server PORT
// =============================================================
const PORT = process.env.PORT || 3001;

// Sets up the Express App
// =============================================================
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku/render)
// =============================================================
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
// Connect to SQL Database
// =============================================================
var connection = mysql.createConnection({
	// Your host
  host: process.env.dbHOST,
  // Your port; if not 3306
  port: process.env.dbPORT,
  // Your username
  user: process.env.dbUSER,
  // Your password
  password: process.env.dbPASSWORD,
  database: process.env.dbDATABASE
});
connection.connect(function(err) {
console.log("connected")
});
// // Outside Routes
// app.use("/api/user", UserController);
// app.use(AuthController);
// require("./routes/post-api-routes.js")(app);
// TODO: Add console app.

// Test routes to see if ther server is talking to the client
// =============================================================
app.get("/api/config", (req, res) => {
	res.json({
		success: true,
	});
});
app.get("/apiFun", (req, res) => {
	res.send("API FUN");
	// var adminUser = req.params.apiFun;
	// console.log(adminUser);
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
app.listen(PORT, () => {
	console.log(`🌎 App is running on http://localhost:${PORT}`);
});
