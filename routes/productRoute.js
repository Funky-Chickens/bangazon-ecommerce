'use strict';

const { Router } = require('express');
const router = Router();

const { getProductList, addProduct, getProductDetail } = require('../controllers/productCtrl');

router.get('/products/?query', getProductList);

router.post('/product/create', addProduct);

router.get('/product/:id', getProductDetail);

module.exports = router;