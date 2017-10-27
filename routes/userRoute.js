'use strict';

const { Router } = require('express');
const router = Router();

const { getUserDetails, updateUser, postPaymentOption, removeUserPaymentOption } = require('../controllers/userCtrl');

router.get('/user', isLoggedIn, getUserDetails);
router.post('/user', isLoggedIn, postPaymentOption, getUserDetails);
router.delete('/user', isLoggedIn, removeUserPaymentOption);

// router.put('/user/:id', updateUser);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;