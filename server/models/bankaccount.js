'use strict';
module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define('BankAccount', {
    isCurrent: DataTypes.BOOLEAN,
    checkingBalance: DataTypes.FLOAT,
    savingsBalance: DataTypes.FLOAT
  }, {});
  BankAccount.associate = function(models) {
    // associations can be defined here
    BankAccount.belongsTo(models.user, {as : 'user', foreignKey: 'userId'})
  };
  return BankAccount;
};
