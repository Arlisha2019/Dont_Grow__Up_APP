'use strict';
module.exports = (sequelize, DataTypes) => {
  const Housing = sequelize.define('Housing', {
    isCurrent: DataTypes.BOOLEAN,
    rentAmount: DataTypes.FLOAT,
    dueDate: DataTypes.DATEONLY
  }, {});
  Housing.associate = function(models) {
    // associations can be defined here
  };
  return Housing;
};