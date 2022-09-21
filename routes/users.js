
const express = require('express')
const router = express.Router()

const passport = require('passport');
const controller = require('../controllers/homecontrollers')
router.get('/sign-up' , controller.signup);
router.post('/create' , controller.create);
router.get('/sign-in' , controller.signin);
router.get('/profilepage/' ,passport.checkAuthentication ,controller.profilepage);
router.get('/profilepage/:id' ,passport.checkAuthentication ,controller.profilepage);
// now we are using passport as a middleware to authenicate
router.post('/create-session' , passport.authenticate(
'local',
{failureRedirect : '/users/sign-in'},
),controller.createsession);


module.exports = router;