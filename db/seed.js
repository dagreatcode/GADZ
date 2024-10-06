"use strict";

const { User } = require("../models/user"); // Adjust the path if necessary
const { Load } = require("../models/load"); // Adjust the path if necessary

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userEmail = "admin@admin.com";

    // Find or create the user
    const [user] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        password: "password", // Adjust as necessary
        admin: false,
      },
    });

    // Define the loads to be created
    const loads = [
      {
        description: "Load 1 description",
        archived: false,
        company: "Company A",
        userId: user.id,
      },
      {
        description: "Load 2 description",
        archived: false,
        company: "Company B",
        userId: user.id,
      },
      {
        description: "Load 3 description",
        archived: false,
        company: "Company C",
        userId: user.id,
      },
      {
        description: "Load 4 description",
        archived: false,
        company: "Company D",
        userId: user.id,
      },
      {
        description: "Load 5 description",
        archived: false,
        company: "Company E",
        userId: user.id,
      },
    ];

    // Bulk create the loads
    await Load.bulkCreate(loads);
    console.log("Loads seeded successfully!");
  },

  down: async (queryInterface, Sequelize) => {
    const userEmail = "admin@admin.com"; // Fixed the typo here

    // Find the user
    const user = await User.findOne({ where: { email: userEmail } });

    if (user) {
      // Delete loads associated with the user
      await Load.destroy({ where: { userId: user.id } });
      // Optionally, you can delete the user if needed
      await User.destroy({ where: { email: userEmail } });
      console.log("Data rolled back successfully!");
    } else {
      console.log("User not found, no data to rollback.");
    }
  },
};

console.log("Done");
