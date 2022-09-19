
const express = require('express');
const router = express.Router();

const controller = require('../controllers/homecontrollers');
router.get('/',controller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'));

module.exports = router;