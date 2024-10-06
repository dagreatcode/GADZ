"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize"); // Directly import Sequelize
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Initialize Sequelize with the DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // Explicitly specify the dialect
});

// Read all model files and initialize them
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Setup associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach sequelize and Sequelize to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
