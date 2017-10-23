'use strict';

const { productOrders } = require('./data/productOrders');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductOrders', productOrders, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductOrders', null, {});
  }
};