module.exports = function (sequelize, DataTypes) {
  var EmployeeBible = sequelize.define("EmployeeBible ", {
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
  });
  return EmployeeBible;
};
