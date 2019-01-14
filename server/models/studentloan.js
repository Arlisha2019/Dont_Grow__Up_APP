'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentLoan = sequelize.define('StudentLoan', {
    isCurrent: DataTypes.BOOLEAN,
    rentAmount: DataTypes.FLOAT,
    dueDate: DataTypes.DATEONLY,
    balance: DataTypes.FLOAT,
    paymentAmount: DataTypes.FLOAT
  }, {});
  StudentLoan.associate = function(models) {
    // associations can be defined here
  };
  return StudentLoan;
};