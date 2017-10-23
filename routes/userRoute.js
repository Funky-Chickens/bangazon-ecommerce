'use strict';

const { Router } = require('express');
const router = Router();

const { getUserDetails, updateUser } = require('../controllers/userCtrl');

router.get('/user/:id', getUserDetails);

router.put('/user/:id', updateUser);

module.exports = router;