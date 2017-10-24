'use strict'

// getCategories //(with 1st 3 products and count of products in category)

module.exports.getCategories = (req, res, next) => {
  console.log("hi", req);
  const { Category } = req.app.get('models');
  console.log("category", Category);
  Category.findAll() 
  .then( (categories) => {
    console.log("cats?", categories);
    let cats = categories.map( (cat) => {
      return cat.dataValues;
    });
    res.render('categories', {cats});
  })
  .catch( (err) => {
    next(err); 
  });
};
