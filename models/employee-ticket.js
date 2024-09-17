module.exports = function (sequelize, DataTypes) {
  var EmployeeTicket = sequelize.define("EmployeeTicket", {
    userID: DataTypes.STRING,
    name: DataTypes.STRING,
    subject: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  return EmployeeTicket;
};
