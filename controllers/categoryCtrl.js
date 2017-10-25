'use strict'

// getCategories //(with 1st 3 products and count of products in category)

module.exports.getCategories = (req, res, next) => {
  const { Category, Product } = req.app.get('models');
  Category.findAll(
    {
      include: [{
        model: Product, limit: 3
      }]
    }) 
  .then( (categories) => {
    res.render('categories', {categories,
      Product: categories.Product});
  })
  .catch( (err) => {
    next(err); 
  });
};
