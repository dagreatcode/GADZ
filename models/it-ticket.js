module.exports = function (sequelize, DataTypes) {
  var ITticket = sequelize.define("ITticket", {
    userID: DataTypes.STRING,
    name: DataTypes.STRING,
    subject: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  return ITticket;
};
