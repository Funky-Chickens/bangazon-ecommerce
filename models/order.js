'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    order_date: DataTypes.DATE
  }, {timestamps: false});

  Order.associate= (models) => {
        Order.belongsTo(models.User, {
          foreignKey: 'id'
        });
        Order.belongsTo(models.PaymentOption, {
          foreignKey: 'id'
        });
        Order.belongsToMany(models.Product, {
          through:'ProductOrders'
        });
    }
  return Order;
};
