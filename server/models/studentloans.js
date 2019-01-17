'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentLoans = sequelize.define('StudentLoans', {
    isCurrent: DataTypes.BOOLEAN,
    paymentAmount: DataTypes.FLOAT,
    dueDate: DataTypes.DATEONLY,
    balance: DataTypes.FLOAT,
    paymentAmount: DataTypes.FLOAT
  }, {});
  StudentLoans.associate = function(models) {
    // associations can be defined here
    StudentLoans.belongsTo(models.user, {as : 'user', foreignKey: 'userId'})
  };
  return StudentLoans;
};
