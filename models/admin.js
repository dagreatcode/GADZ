module.exports = function(sequelize, DataTypes){
    var Admin = sequelize.define("Admin", {
        email:DataTypes.STRING,
        password: DataTypes.STRING,
        description:DataTypes.STRING,
        admin: DataTypes.STRING,
        developer:DataTypes.STRING,
        archived: DataTypes.STRING,
        contractor: DataTypes.STRING,
        company: DataTypes.STRING
    });
    return Admin;
}