'use strict';

const { paymentOptions } = require('./data/paymentOptions');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PaymentOptions', paymentOptions, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PaymentOptions', null, {});
  }
};