// controllers/DriverController.js
const db = require("../models");

const driverController = {
  getAllDrivers: async (req, res) => {
    try {
      const allDrivers = await db.Driver.findAll();
      res.status(200).json(allDrivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      res.status(500).json({ error: "Failed to fetch drivers" });
    }
  },

  createDriver: async (req, res) => {
    const { description, company, userId } = req.body;

    try {
      // Check if user exists
      const userExists = await db.User.findByPk(userId);
      if (!userExists) {
        return res.status(400).json({ error: "User does not exist." });
      }

      // Create the new driver
      const newDriver = await db.Driver.create({
        description,
        company,
        userId, // Use the validated userId
      });
      res.status(201).json(newDriver);
    } catch (error) {
      console.error("Error creating driver:", error);
      res.status(500).json({ error: "Failed to create driver" });
    }
  },

  getAllUserDrivers: async (req, res) => {
    const { userId } = req.params;
    try {
      const userDrivers = await db.Driver.findAll({
        where: { userId },
      });
      res.status(200).json(userDrivers);
    } catch (error) {
      console.error("Error fetching user drivers:", error);
      res.status(500).json({ error: "Failed to fetch user drivers" });
    }
  },
};

module.exports = driverController;
