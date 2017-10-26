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
      OrderId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Orders',//plural required here
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      ProductId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Products',
          key:'id'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductOrders')
  }
};
