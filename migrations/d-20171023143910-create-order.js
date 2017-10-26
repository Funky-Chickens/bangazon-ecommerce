'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          // Note the plural. Referencing the table?
          model: 'Users',
          key: 'id'
        }
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references: {
          // Note the plural. Referencing the table?
          model: 'PaymentOptions',
          key: 'id'
        }
      },
      order_date: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};
