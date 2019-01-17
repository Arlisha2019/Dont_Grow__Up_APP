'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
        'BankAccounts',
        'paycheck',
          Sequelize.INTEGER
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
   'BankAccounts',
   'paycheck'
 );
  }
};
