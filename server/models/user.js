'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasOne(models.Profile, { as: 'Profile', foreignKey: 'userId'});
    user.hasOne(models.BankAccount, { as: 'BankAccount', foreignKey: 'userId'});
    user.hasOne(models.CreditCard, { as: 'CreditCard', foreignKey: 'userId'});
    user.hasOne(models.Housing, { as: 'Housing', foreignKey: 'userId'});
    user.hasOne(models.StudentLoans, { as: 'StudentLoans', foreignKey: 'userId'});
    user.hasOne(models.Vehicle, { as: 'Vehicle', foreignKey: 'userId'});
  };
  return user;
};
