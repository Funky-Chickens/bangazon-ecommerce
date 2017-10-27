'use strict'

//Looks for orders with no payment_id. If no orders are open, displays "you have no items in your cart".
//If there is an order, displays, the products on the order. -jmr
module.exports.getOrder = (req, res, next) => {
    let user = req.session.passport.user;
    const { Order, Product, PaymentOption } = req.app.get('models');
    Order.findAll({
        raw: true,
        where: {
            buyer_id: user.id,
            payment_id: null
        },
        include: [{
            model: Product
        }]
    })
    .then( (data) => {
        if (data.length < 1 || data[0]['Products.id'] === null) {
            console.log("No active orders found");
            req.flash('emptyCart', 'You have no items in your cart');
            res.render('cart', { messages: req.flash('emptyCart')})
        } else {
            PaymentOption.findAll({
                raw: true,
                where: { buyer_id: user.id }
            })
            .then( (paymentOpts) => {
                console.log("pays", paymentOpts)
                console.log("Showing cart");
                res.render('cart', { data, paymentOpts });
            });
        }
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
      })

}

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