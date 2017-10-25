'use strict';

const { Router } = require('express');
const router = Router();

const { getProductList, addProduct, getProductDetail, renderProductCreateForm } = require('../controllers/productCtrl');
// router.get('/products/?query', getProductList);

router.get('/product/create', renderProductCreateForm);
router.post('/product', addProduct);

// router.get('/product/:id', getProductDetail);

module.exports = router;