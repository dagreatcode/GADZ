module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrCodeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    qrPNG: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredLoadType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experienceLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availableFrom: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    developer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    contractor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loadReferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    drivers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entrepreneur: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driversLicense: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    loadDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    paymentTerms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loadStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driverID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driverExperience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driverAvailability: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    driverRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    companyID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyProfile: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    partnershipStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sentMessages",
    });
    User.hasMany(models.Message, {
      foreignKey: "receiverId",
      as: "receivedMessages",
    });
    User.hasMany(models.Load, { foreignKey: "userId", as: "loads" });
    User.hasMany(models.Driver, { foreignKey: "userId", as: "userDrivers" });
  };

  return User;
};
