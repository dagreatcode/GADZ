module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    admin: DataTypes.STRING,
    developer: DataTypes.STRING,
    archived: DataTypes.STRING,
    contractor: DataTypes.STRING,
    company: DataTypes.STRING,
  });
  return User;
};
