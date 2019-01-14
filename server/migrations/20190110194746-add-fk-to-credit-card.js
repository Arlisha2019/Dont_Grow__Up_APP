'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'CreditCards',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      }
    )
    },

    down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'CreditCards',
      'userId'
        )
      }
    };
