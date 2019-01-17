'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'BankAccounts',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, 
        references: {
          model: "users",
          key: "id"
        }
      }
    )
    },

    down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'BankAccounts',
      'userId'
        )
      }
    };
