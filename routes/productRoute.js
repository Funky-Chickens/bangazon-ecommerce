'use strict';

const { Router } = require('express');
const router = Router();

const { getProductList, addProduct, getProductDetail, renderProductCreateForm } = require('../controllers/productCtrl');

//protect routes

// router.get('/products/?query', getProductList);

router.get('/products/create', renderProductCreateForm);
router.post('/products', addProduct);

router.get('/products/:id', getProductDetail);

module.exports = router;