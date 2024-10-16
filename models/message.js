module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    sender: {
      type: DataTypes.INTEGER, // Change to INTEGER
      allowNull: false,
    },
    receiver: {
      type: DataTypes.INTEGER, // Change to INTEGER
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // Associations
  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: "sender", as: "Sender" });
    Message.belongsTo(models.User, { foreignKey: "receiver", as: "Receiver" });
  };

  return Message;
};
