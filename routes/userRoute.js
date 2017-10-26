'use strict';

const { Router } = require('express');
const router = Router();

const { getUserDetails, updateUser, postPaymentOption } = require('../controllers/userCtrl');

router.get('/user', getUserDetails);
router.post('/user', postPaymentOption);

// router.put('/user/:id', updateUser);

module.exports = router;