'use strict'

module.exports.getOrder = (req, res, next) => {
    console.log("hiya!", req.session.passport.user)
    const {Order, Product} = req.app.get('models');
    Order.findOne({
        where:{buyer_id:req.session.passport.user}
    })
    .then((oneOrder)=>{
        console.log("oneOrder", oneOrder)
        if (!oneOrder.dataValues.payment_id){
            console.log("order id?", oneOrder.dataValues.id);
        }
        //   "buyer_id": 1,
        // "payment_id": 1,
        // "order_date": "2017-01-25T23:59:03.244Z"
    })
}
module.exports.addOrder = (req, res, next) =>{
    
}
// updateOrder
// deleteOrder

// deleteProductOrder
module.exports.addProductOrder = (req, res, next) => {

} //(put product in cart here?)
