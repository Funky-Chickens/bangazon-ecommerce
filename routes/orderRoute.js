'use strict';

const { Router } = require('express');
const router = Router();

const { getOrder, addOrder, updateOrder, deleteOrder, addProductOrder, deleteProductOrder } = require('../controllers/orderCtrl');

router.get('/order', isLoggedIn, getOrder);

router.post('/order', isLoggedIn, addOrder);

router.put('/order/:id', isLoggedIn, updateOrder);

// router.delete('/order/:id', deleteOrder);

// router.post('/order/:id', addProductOrder);//joins with pug form, product/order controllers, and main.js click event

// router.delete('/order/:id', deleteProductOrder);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;