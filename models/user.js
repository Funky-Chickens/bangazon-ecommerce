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
  });
  
  User.classMethods = {
      associate: function(models) {
        hasMany(models.PaymentOption, { 
          foreignKey: 'user_id',
        });
        hasMany(models.Order, {
          foreignKey: 'user_id'
        });
        hasMany(models.Product, {
          foreignKey: 'user_id',
          as: 'Seller_id'
        });
      }
    }

  return User;
};
