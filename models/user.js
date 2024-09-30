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
    qrCode: {
      // Field for QR code SVG
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrCodeId: {
      // New field for QR code ID
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrData: {
      // Additional field for QR code data if needed
      type: DataTypes.JSON, // Store as JSON if multiple fields
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
