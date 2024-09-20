module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    content: DataTypes.STRING,
  });
  return Message;
};
