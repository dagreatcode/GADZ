module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      // validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6], // A password must be at least 6 characters long
      },
      required: true,
    },
    description: DataTypes.STRING,
    admin: DataTypes.STRING,
    developer: DataTypes.STRING,
    archived: DataTypes.STRING,
    contractor: DataTypes.STRING,
    company: DataTypes.STRING,
  });
  return User;
};
