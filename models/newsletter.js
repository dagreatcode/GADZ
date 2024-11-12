module.exports = function (sequelize, DataTypes) {
  var NewsLetter = sequelize.define(
    "NewsLetter",
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      important: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Assuming 1 is the admin's user ID
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true, // Soft delete
    }
  );

  return NewsLetter;
};
