"use strict";

const { User, Load } = require("../models"); // Adjust the path if necessary

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all users
    const users = await User.findAll();

    // Define the loads to be created for each user
    const loads = [];

    users.forEach((user, index) => {
      loads.push({
        description: `Load ${index + 1} description`,
        archived: false,
        company: `Company ${String.fromCharCode(65 + index)}`, // A, B, C, ...
        userId: user.id,
      });
    });

    // Bulk create the loads
    await Load.bulkCreate(loads);
    console.log("Loads seeded successfully for all users!");
  },

  down: async (queryInterface, Sequelize) => {
    // Find all users
    const users = await User.findAll();

    if (users.length > 0) {
      // Delete loads associated with all users
      const userIds = users.map((user) => user.id);
      await Load.destroy({ where: { userId: userIds } });
      console.log("Data rolled back successfully!");
    } else {
      console.log("No users found, no data to rollback.");
    }
  },
};

console.log("Done");

// NODE_ENV=production npx sequelize-cli db:seed:all
// DATABASE_URL=postgres://username:password@hostname:port/databasename
// sequelize db:seed:all
// sequelize db:seed:undo
// sequelize db:seed:undo:all
