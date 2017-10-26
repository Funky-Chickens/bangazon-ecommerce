'use strict';

const {
    Router
} = require('express');
const router = Router();

const {
    getProductList,
    getSearchedProducts,
    addProduct,
    getProductDetail,
    renderProductCreateForm
} = require('../controllers/productCtrl');
// router.get('/products/?query', getProductList);

router.get('/products/create', renderProductCreateForm);
router.post('/products', addProduct);
router.get('/products', getProductList);


// router.get('/product/:id', getProductDetail);

module.exports = router;