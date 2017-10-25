'use strict';

const passport = require('passport');
var session = require('express-session');

// getProductsList //(also need to get by category & based on search & get a count)
module.exports.getProductList = (req, res, next) => {
    const {Product} = req.app.get('models');
    Product.findAll() 
    .then((products) => {
        let prods = products.map( (prod) => {
            return prod.dataValues;
        });
        console.log("prods??", prods);
        res.render('product_list', {prods});
    })
    .catch( (err) => {
      next(err); 
    });
  };
// addProduct
// getProductsDetail

module.exports.renderProductCreateForm = (req, res, next) => {
    const { Category } = req.app.get('models');
    console.log("hello");
    Category.findAll() 
    .then( (categories) => {
        let cats = categories.map( (cat) => {
            return cat.dataValues;
        });
        res.render('create_product', {cats})
    });
}

module.exports.addProduct = (req, res, next) => {
    const user = req.session.passport.user // get the user from session.passport
    const { Product, Category } = req.app.get('models');
    Category.findOne({ //get the associated category id, using the category name from the submit form
       where: {name: req.body.productCategory} 
    })
    .then( (category) => {
        let catId = category.dataValues.id;
        return Product.create({
        category_id: catId, //pass category ID in to submit object
        price: req.body.price,
        name: req.body.name,
        description: req.body.description,
        quantity_avail: req.body.quantity_avail,
        seller_id: user.id
        })
    })
    .then( (result) => {
      res.status(200).redirect('/products/create');
    })
    .catch( (err) => {
       res.status(500).json(err)
    });
}