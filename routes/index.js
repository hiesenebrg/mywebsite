
const express = require('express');
const router = express.Router();

const controller = require('../controllers/homecontrollers');
router.get('/',controller.home);
router.use('/users',require('./users'));

module.exports = router;