module.exports = function (sequelize, DataTypes) {
  var Load = sequelize.define("Load ", {
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
    company: DataTypes.STRING,
  });
  return Load;
};
