'use strict';

const { Router } = require('express');
const router = Router();

const { getOrder, addOrder, updateOrder, deleteOrder, addProductOrder, deleteProductOrder } = require('../controllers/orderCtrl');

// router.get('/order/:id', getOrder);

// router.post('/order', addOrder);

// router.put('/order/:id', updateOrder);

// router.delete('/order/:id', deleteOrder);

router.post('/order/:id', addProductOrder);//joins with pug form, product/order controllers, and main.js click event


// router.delete('/order/:id', deleteProductOrder);

module.exports = router;