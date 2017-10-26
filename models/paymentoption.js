'use strict';
module.exports = (sequelize, DataTypes) => {
  var PaymentOption = sequelize.define('PaymentOption', {
    buyer_id: DataTypes.INTEGER,
    account: DataTypes.INTEGER,
    payment_name: DataTypes.STRING
  }, {timestamps: false});

  PaymentOption.associate = (models) => {
        PaymentOption.belongsTo(models.User, {
          foreignKey: 'id',
          as: "Buyer_id" });
        PaymentOption.hasMany(models.Order, {
          foreignKey: 'id'
        });
    }
  return PaymentOption;
};
