'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    isCurrent: DataTypes.BOOLEAN,
    paymentAmount: DataTypes.FLOAT,
    dueDate: DataTypes.DATEONLY,
    balance: DataTypes.FLOAT,
    paymentAmount: DataTypes.FLOAT,
    interestRate: DataTypes.FLOAT
  }, {});
  Vehicle.associate = function(models) {
    // associations can be defined here
    Vehicle.belongsTo(models.user, {as : 'user', foreignKey: 'userId'})
  };
  return Vehicle;
};
