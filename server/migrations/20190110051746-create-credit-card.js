'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CreditCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isCurrent: {
        type: Sequelize.BOOLEAN
      },
      paymentAmount: {
        type: Sequelize.FLOAT
      },
      dueDate: {
        type: Sequelize.DATEONLY
      },
      balance: {
        type: Sequelize.FLOAT
      },
      paymentAmount: {
        type: Sequelize.FLOAT
      },
      interestRate: {
        type: Sequelize.FLOAT
      },
      availableBalance: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CreditCards');
  }
};