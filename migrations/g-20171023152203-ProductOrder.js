'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductOrders',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Orders',//plural required here
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      product_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Products',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductOrders')
  }
};
