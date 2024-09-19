module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    user: DataTypes.STRING,
    text: DataTypes.STRING,
  });
  return Message;
};
