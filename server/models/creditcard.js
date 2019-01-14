'use strict';
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define('CreditCard', {
    isCurrent: DataTypes.BOOLEAN,
    paymentAmount: DataTypes.FLOAT,
    dueDate: DataTypes.DATEONLY,
    balance: DataTypes.FLOAT,
    paymentAmount: DataTypes.FLOAT,
    interestRate: DataTypes.FLOAT,
    availableBalance: DataTypes.FLOAT
  }, {});
  CreditCard.associate = function(models) {
    // associations can be defined here
  };
  return CreditCard;
};