'use strict'

// getProductsList //(also need to get by category & based on search & get a count)
// addProduct
module.exports.getProductDetail = (req, res, next)=>{
    const {Product, Order} = req.app.get('models');  //require in order model too? look at empCtrl.
    Product.findById(parseInt(req.params.id))
    .then( (foundProd) =>{
        console.log(foundProd.dataValues)
        res.render('product_detail', {
            id:foundProd.dataValues.id,
            name: foundProd.dataValues.name,
            description:foundProd.dataValues.description,
            price:foundProd.dataValues.price,
            quantity_avail: foundProd.dataValues.quantity_avail
          });
        Order.getOrder(session.passport)
        .then((oneOrder)=>{
            if (oneOrder){
                console.log(oneOrder);//check to see if it has a payment type
            }else{

            }
        })
    })
}
//openOrder.order_id?

module.exports.renderProductCreateForm = (req, res, next) => {
    res.render('create_product')
}

