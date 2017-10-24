'use strict'

// getCategories //(with 1st 3 products and count of products in category)

module.exports.getCategories = (req, res, next) => {
    const { Categories } = req.app.get('models');
    Categories.findAll() 
    .then( (categories) => {
      let cats = categories.map( (cat) => {
        return cat.dataValues;
      });
      res.render('categories', {cats});
    })
    .catch( (err) => {
      next(err); 
    });
  };
