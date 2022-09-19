const express = require('express');
const router = express.Router();

const postcontroller = require('../controllers/postcontroller');

router.post('/create', 
    postcontroller.create
  );


module.exports = router;