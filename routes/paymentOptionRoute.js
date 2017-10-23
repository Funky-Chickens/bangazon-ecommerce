'use strict';

const { Router } = require('express');
const router = Router();

const { getPaymentOption, addPaymentOption, deletePaymentOption } = require('../controllers/paymentOptionCtrl');

router.get('/user/:id', getPaymentOption);
router.get('/order/:id', getPaymentOption);

router.post('/user/:id', addPaymentOption);
router.post('/order/:id', addPaymentOption);

router.delete('/user/:id', deletePaymentOption);

module.exports = router;