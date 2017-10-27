'use strict';

const passport = require('passport');
var session = require('express-session');

// getProductsList //(also need to get by category & based on search & get a count)
module.exports.getProductList = (req, res, next) => {
    const {Product} = req.app.get('models');
    if (req.query.search === undefined || req.query.search === null){//if no search terms, get all
        Product.findAll() 
        .then((products) => {
            let prods = products.map( (prod) => {
                return prod.dataValues;
            });
            res.render('product_list', {prods});
        })
        .catch( (err) => {
          next(err);
        });
    }
    else {//if search terms entered, filter down by term entered in search bar
        Product.findAll({Where: {search: req.query.search}})
        .then((products) => {
            let prods = products.filter( (prod) => {
                let titles = prod.dataValues.name.toLowerCase();//toLowerCase makes sure the terms match accurately
                let searchName = req.query.search.toLowerCase();
                if(titles.includes(`${searchName}`)) { //string method .includes
                return prod.dataValues;
                }
          });
          res.render('product_list', {prods});
        });
    }
  };
// addProduct
module.exports.getProductDetail = (req, res, next)=>{
    const {Product, Order} = req.app.get('models');
    let prod;//make product data available throughout function
    Product.findById(parseInt(req.params.id), {raw: true})
    //find one product by id passed in click event -gm
    .then( (foundProd) =>{
        prod=foundProd;
        console.log("prod", foundProd)
        return Order.findOne({
            raw:true,
            where:{
                buyer_id:req.session.passport.user.id
        }})
    .then((oneOrder)=>{
        if(oneOrder){
            console.log("oneOrder?", oneOrder.id);
            res.render('product_detail', { //render product_detail pug page with detail info -gm
                id:prod.id,
                name: prod.name,
                description:prod.description,
                price:prod.price,
                quantity_avail: prod.quantity_avail,
                order_id: oneOrder.id //to pass along the order_id for the pug template conditional
                //if the order id exists, use first condition, if not, use second in pug
                //-jmr, cm
              });
        }else{
            res.render('product_detail', { //render product_detail pug page with detail info -gm
                id:prod.id,
                name: prod.name,
                description:prod.description,
                price:prod.price,
                quantity_avail: prod.quantity_avail,
                order_id: null
              });
        }

        })
    })
}

module.exports.renderProductCreateForm = (req, res, next) => {
    const { Category } = req.app.get('models');
    // console.log("hello");
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