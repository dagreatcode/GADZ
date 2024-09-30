module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_code_id: {
      // Add this field
      type: DataTypes.STRING,
      allowNull: true,
    },
    qr_code_svg: {
      // Store the SVG file path
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: DataTypes.STRING,
    admin: DataTypes.STRING,
    developer: DataTypes.STRING,
    archived: DataTypes.STRING,
    contractor: DataTypes.STRING,
    company: DataTypes.STRING,
    // qrCodeData: DataTypes.String,
  });
  return User;
};

// models/User.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_code_id: {
      // Add this field
      type: DataTypes.STRING,
      allowNull: true,
    },
    qr_code_svg: {
      // Store the SVG file path
      type: DataTypes.STRING,
      allowNull: true,
    },
    // other fields...
  });

  return User;
};
