module.exports = function (sequelize, DataTypes) {
  var NewsLetter = sequelize.define("NewsLetter", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
  });
  return NewsLetter;
};
