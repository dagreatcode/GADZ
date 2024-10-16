module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // Associations
  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: "sender" });
    Message.belongsTo(models.User, {
      foreignKey: "receiver",
      // as: "receiver",
    });
  };

  return Message;
};
