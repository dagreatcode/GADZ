module.exports = function (sequelize, DataTypes) {
  var AdminBible = sequelize.define("AdminBible ", {
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
  });
  return AdminBible;
};
