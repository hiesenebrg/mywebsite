
const express = require('express')
const router = express.Router()

const controller = require('../controllers/homecontrollers')
router.get('/sign-up' , controller.signup);
router.post('/create' , controller.create);
router.get('/sign-in' , controller.signin);
router.get('/profilepage' , controller.profilepage);
router.post('/create-session' , controller.createsession);


module.exports = router;