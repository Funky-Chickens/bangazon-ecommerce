'use strict';

const {
    Router
} = require('express');
const router = Router();

const {
    getProductList,
    addProduct,
    getProductDetail,
    renderProductCreateForm
} = require('../controllers/productCtrl');

//protect routes

// router.get('/products/?query', getProductList);

router.get('/products/create', isLoggedIn, renderProductCreateForm);
router.post('/products', isLoggedIn, addProduct);
router.get('/products', getProductList);


router.get('/products/:id', getProductDetail);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = router;