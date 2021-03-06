'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.TEXT,
    phone: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    start_date: DataTypes.DATE,
    last_login: DataTypes.DATE
  }, {timestamps: false});

  User.associate = (models) => {
        User.hasMany(models.PaymentOption, {
          foreignKey: 'buyer_id',
        });
        User.hasMany(models.Order, {
          foreignKey: 'buyer_id'
        });
        User.hasMany(models.Product, {
          foreignKey: 'id',
          as: 'seller_id'
        });
    }

  return User;
};
