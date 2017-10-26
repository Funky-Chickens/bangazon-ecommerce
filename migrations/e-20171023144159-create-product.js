'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      quantity_avail: {
        type: Sequelize.INTEGER
      },
      seller_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          // Note the plural. Referencing the table?
          model: 'Users',
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          // Note the plural. Referencing the table?
          model: 'Categories',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
