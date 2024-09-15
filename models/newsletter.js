module.exports = function (sequelize, DataTypes) {
  var NewLetter = sequelize.define("NewLetter", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
  });
  return NewLetter;
};
