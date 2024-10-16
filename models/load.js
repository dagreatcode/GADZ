module.exports = function (sequelize, DataTypes) {
  const Load = sequelize.define("Load", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "This is my first load",
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      // Foreign key reference to User
      type: DataTypes.INTEGER, // Assuming User ID is an integer
      allowNull: false,
      references: {
        model: "Users", // Correctly matches the table name for the User model
        key: "id", // Matches the primary key of the User model
      },
    },
  });

  // Associations
  Load.associate = (models) => {
    Load.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Load;
};
