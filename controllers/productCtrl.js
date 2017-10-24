'use strict'

// getProductsList //(also need to get by category & based on search & get a count)
// addProduct
module.exports.getProductDetail = (req, res, next)=>{
    const {Product} = req.app.get('models');
    Product.findById(parseInt(req.params.id))
    .then( (foundProd) =>{
        res.render('product_detail', {
            id:foundProd.dataValues.id,
            name: foundProd.dataValues.name,
            description:foundProd.dataValues.description,
            price:foundProd.dataValues.price,
            quantity_avail: foundProd.dataValues.quantity_avail
          });
    })

}

module.exports.renderProductCreateForm = (req, res, next) => {
    res.render('create_product')
}

