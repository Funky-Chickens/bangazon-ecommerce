'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn( 'Products', 'category_id', Sequelize.INTEGER );
    queryInterface.addColumn( 'Products', 'seller_id', Sequelize.INTEGER );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn( 'Product', 'category_id' );
    queryInterface.removeColumn( 'Product', 'seller_id' );
  }
};
