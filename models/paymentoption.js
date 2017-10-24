'use strict';
module.exports = (sequelize, DataTypes) => {
  var PaymentOption = sequelize.define('PaymentOptions', {
    buyer_id: DataTypes.INTEGER,
    account: DataTypes.INTEGER,
    payment_name: DataTypes.STRING
  }, {timestamps: false});
  
  PaymentOption.classMethods = {
      associate: function(models) {
        belongsTo(models.User, { 
          foreignKey: 'buyer_id',
          as: "Buyer_id" });
        hasMany(models.Order, {
          foreignKey: 'payment_id'
        });
      }
    }
  return PaymentOption;
};