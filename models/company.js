module.exports = function (sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
    company: DataTypes.STRING,
  });
  return Company;
};
