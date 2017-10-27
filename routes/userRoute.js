'use strict';

const { Router } = require('express');
const router = Router();

const { getUserDetails, updateUser, postPaymentOption, removeUserPaymentOption } = require('../controllers/userCtrl');

router.get('/user', getUserDetails);
router.post('/user', postPaymentOption, getUserDetails);
router.delete('/user', removeUserPaymentOption);

// router.put('/user/:id', updateUser);

module.exports = router;