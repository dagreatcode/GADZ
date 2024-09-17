module.exports = function (sequelize, DataTypes) {
  var AgreementTemplate = sequelize.define("AgreementTemplate", {
    email: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    numberMC: DataTypes.STRING,
    freightRate: DataTypes.STRING,
    invoiceRate: DataTypes.INTEGER,
    company: DataTypes.STRING,
    signature: DataTypes.STRING,
  });
  return AgreementTemplate;
};
