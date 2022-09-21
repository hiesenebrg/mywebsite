const express = require('express');
const passport = require('passport');
const router = express.Router();

const Commentcontroller = require('../controllers/commentcontoller');

router.post('/create', passport.checkAuthentication, 
Commentcontroller.create);
router.post('/destroy/:id', passport.checkAuthentication, 
Commentcontroller.destroy);

module.exports =router;