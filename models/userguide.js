module.exports = function (sequelize, DataTypes) {
  var UserGuide = sequelize.define("UserGuide ", {
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
  });
  return UserGuide;
};
