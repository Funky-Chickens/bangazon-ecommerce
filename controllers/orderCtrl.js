'use strict'

module.exports.getOrder = (req, res, next) => {//-gm/jmr
    console.log("hiya!", req.session.passport.user)
    const {Order, Product} = req.app.get('models');
    Order.findOne({
        where:{buyer_id:req.session.passport.user.id}//get order based on uid
    })
    .then((oneOrder)=>{
        console.log("oneOrder", oneOrder)
        console.log("order id?", oneOrder.dataValues.id);
        if (!oneOrder || !oneOrder.dataValues.payment_id){ //if no order
            next()
        }else{
            res.render('cart', oneOrder.dataValues.id);
        }
    })
}

//post new order to db
module.exports.addOrder = (req, res, next) =>{ //-gm
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
        res.redirect(`/order/${result.dataValues.id}`); //redirect here to /order/:id for productorders join table to be updated?
      })
      .catch( (err) => {
         res.status(500).json(err)
      })

}

//put
module.exports.updateOrder = (req, res, next)=>{ //-gm
    const {Order, Product} = req.app.get('models');
    console.log("hello from update order");
    Order.update({
        buyer_id:req.session.passport.user.id,
        payment_id: req.body.payment_id,
        order_date: req.body.order_date,
        createdAt:null,
        updatedAt:null
    }, {where:{id: req.params.id}})
    .then((order)=>{
        console.log("order in update order", order);
        res.status(200).send();//redirect to do join table?
      })
      .catch( (err) => {
        next(err);
      });
}
// deleteOrder

// deleteProductOrder
module.exports.addProductOrder = (req, res, next) => {
    console.log("hiya from addProductOrder")
    const {Order, Product} = req.app.get('models');
    console.log("order id? inside add product order", req.params.id)
    console.log("prodObj inside add productorder", prodObj)


} //(put product in cart here?)
