module.exports = function (sequelize, DataTypes) {
  var ClockIn = sequelize.define("ClockIn ", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    archived: DataTypes.STRING,
    company: DataTypes.STRING,
  });
  return ClockIn;
};
