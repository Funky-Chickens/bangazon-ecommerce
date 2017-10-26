'use strict'

module.exports.getOrder = (req, res, next) => {
    console.log("hiya!", req.session.passport.user)
    const {Order, Product} = req.app.get('models');
    Order.findAll({raw: true, include: [{all: true}]})
    .then((oneOrder)=>{
        console.log("oneOrder", oneOrder)
        // console.log("order id?", oneOrder.dataValues.id);
        // if (!oneOrder || oneOrder.payment_id){ //if no order
        //     next()
        // }else{
        //     res.render('cart', oneOrder.dataValues.id);
        // }
    });
}

//post new order to db
module.exports.addOrder = (req, res, next) =>{
    console.log("hello from add order");
    const {Order, Product} = req.app.get('models');
    let date= new Date();
    Order.create({
        buyer_id:req.session.passport.user.id,
        payment_id: null,
        order_date: date,
        createdAt:null,
        updatedAt:null
      })
      .then( (result) => {
        console.log("result of add order to order table", result);//needs to return the lastID of what was posted so we can use that value?
         res.status(200); //redirect here to /order?
      })
      .catch( (err) => {
         res.status(500).json(err)
      });

};

//put
module.exports.updateOrder = (req, res, next)=>{
    const {Order, Product} = req.app.get('models');
    console.log("hello from update order");
    Order.update({
        buyer_id:req.session.passport.user.id,
        payment_id: req.body.payment_id,//origin of payment info?
        order_date: req.body.order_date,
        createdAt:null,
        updatedAt:null
    }, {where:{id: req.params.id}})
    .then((order)=>{
        console.log("order in update order", order);
        res.status(200).send();
      })
      .catch( (err) => {
        next(err);
      });
}
// deleteOrder

// deleteProductOrder
module.exports.addProductOrder = (req, res, next) => {

} //(put product in cart here?)
