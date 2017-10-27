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
        if (data.length < 1) {
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
    .then((order)=>{
        console.log("order", order);
        //do a get by id using order
        return Order.findById(order[0])
    })
    .then((oneOrder)=>{
        return oneOrder.addProduct(req.body.prod_id)//magic built-in sequelize methods to add product to order & update join table?
    })
    .then((data)=>{
        console.log(data);
        req.flash('addMessage', 'Product has been added to cart' );
        res.redirect(`/products/${req.body.prod_id}`);//redirect back to product detail view
    })
    .catch( (err) => {
        res.status(500).json(err)
    });

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
        console.log("order", order);
        //do a get by id using order
        return Order.findById(order[0])
    })
        .then((order)=>{
            return order.addProduct(req.body.prod_id)//magic built-in sequelize methods to add product to order & update join table?
        })
        .then((data)=>{
            console.log(data);
            req.flash('addMessage', 'Product has been added to cart' );
            res.redirect(`/products/${req.body.prod_id}`);//redirect back to product detail view
        })
    .catch( (err) => {
        next(err);
    });
}
// TODO deleteOrder

//TODO deleteProductOrder

