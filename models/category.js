'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });
  
    Category.associate = (models) => {
      Category.hasMany(models.Product, {
        foreignKey: 'category_id'
      });
    };
  return Category;
};