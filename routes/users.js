
const express = require('express')
const router = express.Router()

const passport = require('passport');
const controller = require('../controllers/homecontrollers')
const freindcontroller = require('../controllers/friendcontroller')
router.get('/sign-up' , controller.signup);
router.post('/create' , controller.create);
    
 
router.get('/sign-out' , controller.signout);
router.get('/sign-in' , controller.signin);
router.get('/profilepage/' ,passport.checkAuthentication ,controller.profilepage);
router.post('/update/:id' , controller.update);
router.get('/profilepage/:id' ,passport.checkAuthentication ,controller.profilepage);
// now we are using passport as a middleware to authenicate
router.post('/create-session' , passport.authenticate(
'local',
{failureRedirect : '/users/sign-in'},
),controller.createsession);
router.post('/friends/:id' , freindcontroller.create);
router.get('/auth/google' , passport.authenticate('google', {scope:['profile' , 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect :'/users/sign-in'}),controller.createsession);



module.exports = router;