'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    category_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity_avail: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER
  });
  
  Product.classMethods = {
      associate: function(models) {
        Product.belongsTo(models.Category, { 
          foreignKey: 'category_id',
          as: "Category" });
        Product.belongsTo(models.User, { 
          foreignKey: 'user_id',
          as: "Seller_id" });
        Product.belongsToMany(models.Order, {
          through:'ProductOrders'
        });
      }
    }
  return Product;
};