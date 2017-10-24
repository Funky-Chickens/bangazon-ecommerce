'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    buyer_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE
  });

  Order.classMethods = {
      associate: function(models) {
        Order.belongsTo(models.User, {
          foreignKey: 'user_id',
          as: "Buyer" });
        Order.belongsTo(models.PaymentOption, {
          foreignKey: 'payment_id',
          as: "Payment_id" });
        Order.belongsToMany(models.Product, {
          through:'ProductOrders'
        });
      }
    }
  return Order;
};