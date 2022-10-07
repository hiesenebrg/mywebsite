const express = require('express');
const router = express.Router();

const controller = require('../controllers/likes_controller');
router.get('/toogle' , controller.toggleLike);




module.exports = router;