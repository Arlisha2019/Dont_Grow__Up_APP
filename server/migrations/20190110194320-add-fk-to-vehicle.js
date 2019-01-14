'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Vehicles',
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
      'Vehicles',
      'userId'
        )
      }
    };
