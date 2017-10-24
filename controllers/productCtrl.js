'use strict';

const passport = require('passport');
var session = require('express-session');

// getProductsList //(also need to get by category & based on search & get a count)
// addProduct
// getProductsDetail

module.exports.renderProductCreateForm = (req, res, next) => {
    res.render('create_product')
}

module.exports.addProduct = (req, res, next) => {
    // console.log("user", session.passport.user)
    const user = req.session.passport.user
    console.log(user);
    const { Product } = req.app.get('models');
    Product.create({
      category_id: req.body.category_id,
      price: req.body.price,
      name: req.body.name,
      description: req.body.description,
      quantity_avail: req.body.quantity_avail,
      seller_id: user.id
    })
    .then( (result) => {
      res.status(200).redirect('/computers');
    })
    .catch( (err) => {
       res.status(500).json(err)
    })
}

// {
//     "category_id": 2,
//     "price": 5.50,
//     "name": "Fake Poop",
//     "description": "looks just like the real thing!",
//     "quantity_avail": 8,
//     "seller_id": 1
//   },

