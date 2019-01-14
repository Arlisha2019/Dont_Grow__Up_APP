'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'StudentLoans',
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
      'StudentLoans',
      'userId'
        )
      }
    };
