'use strict'

module.exports.getOrder = (req, res, next) => {//-gm/jmr
    const {Order, Product} = req.app.get('models');
    Order.findAll({raw: true, include: [{all: true}]})
    .then((oneOrder)=>{
        // console.log("oneOrder", oneOrder)
        // console.log("order id?", oneOrder.dataValues.id);
        // if (!oneOrder || oneOrder.payment_id){ //if no order
        //     next()
        // }else{
        //     res.render('cart', oneOrder.dataValues.id);
        // }
    });
}

//post new order to db
module.exports.addOrder = (req, res, next) =>{ //-gm
    const {Order, Product} = req.app.get('models');
    let date= new Date();
    console.log("add order req.body", req.body.prod_id)
    Order.create({
        buyer_id:req.session.passport.user.id,
        payment_id: null,
        order_date: date,
        createdAt:null,
        updatedAt:null
      })
      .then( (result) => {
        res.redirect(`/order/${result.dataValues.id}`); //redirect here to /order/:id for productorders join table to be updated?
      })
      .catch( (err) => {
         res.status(500).json(err)
      });

};

module.exports.addProductOrder = (req, res, next) => {
    // console.log("hiya from addProductOrder")
    // const {Order, Product} = req.app.get('models');
    // console.log("order id? inside add product order", req.params.id)
    // console.log('req.body', req.body)
    // console.log("prodObj inside add productorder", prodObj)


}

//put
module.exports.updateOrder = (req, res, next)=>{ //-gm
    const {Order, Product} = req.app.get('models');
    console.log("hello from update order");
    console.log("update order req.body", req.body)
    Order.update({
        buyer_id:req.session.passport.user.id,
        payment_id: req.body.payment_id,
        order_date: req.body.order_date,
        createdAt:null,
        updatedAt:null
    }, {where:{id: req.params.id}})
    .then((order)=>{
        // console.log("order in update order", order);
        res.status(200).send();//redirect to where?
      })
      .catch( (err) => {
        next(err);
      });
}
// TODO deleteOrder

//TODO deleteProductOrder


