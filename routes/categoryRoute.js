'use strict';

const { Router } = require('express');
const router = Router();

const { getCategories } = require('../controllers/categoryCtrl');

router.get('/', getCategories);

module.exports = router;