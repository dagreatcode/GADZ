module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    employee: DataTypes.STRING,
    developer: DataTypes.STRING,
    archived: DataTypes.STRING,
    contractor: DataTypes.STRING,
    company: DataTypes.STRING,
  });
  return Employee;
};
