// controllers/LoadController.js
const db = require("../models");

const loadController = {
  getAllLoads: async (req, res) => {
    try {
      const allLoads = await db.Load.findAll();
      res.status(200).json(allLoads);
    } catch (error) {
      console.error("Error fetching loads:", error);
      res.status(500).json({ error: "Failed to fetch loads" });
    }
  },

  createLoad: async (req, res) => {
    const { description, company, userId } = req.body;

    try {
      // Check if user exists
      const userExists = await db.User.findByPk(userId);
      if (!userExists) {
        return res.status(400).json({ error: "User does not exist." });
      }

      // Create the new load
      const newLoad = await db.Load.create({
        description,
        company,
        userId, // Use the validated userId
      });
      res.status(201).json(newLoad);
    } catch (error) {
      console.error("Error creating load:", error);
      res.status(500).json({ error: "Failed to create load" });
    }
  },

  getAllUserLoads: async (req, res) => {
    const { userId } = req.params;
    try {
      const userLoads = await db.Load.findAll({
        where: { userId },
      });
      res.status(200).json(userLoads);
    } catch (error) {
      console.error("Error fetching user loads:", error);
      res.status(500).json({ error: "Failed to fetch user loads" });
    }
  },
};

module.exports = loadController;
