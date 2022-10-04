const express = require('express');
const router = express.Router();

// const postApi = require('../../../controllers/api/v1/posts_api');
router.use('/posts' , require('./posts'));
router.use('/users' , require('./user'));



module.exports = router;