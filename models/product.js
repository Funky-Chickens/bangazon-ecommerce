'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity_avail: DataTypes.INTEGER,
  }, {timestamps: false});

  Product.associate = (models) => {
        Product.belongsTo(models.Category, {
          foreignKey: 'id'
         });
        Product.belongsTo(models.User, {
          foreignKey: 'id',
        });
        Product.belongsToMany(models.Order, {
          through:'ProductOrders'
        });
      }
  return Product;
};
