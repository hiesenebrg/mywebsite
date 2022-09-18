const express = require('express');
const cookieparser = require('cookie-parser');
const port = 8000;
const mongoose = require("mongoose");
const app = express();
const db = require('./config/mongoose');
app.use(cookieparser());
app.use(express.urlencoded());

app.use('/', require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');





app.listen(port,function(err){
    if(err){
        console.log("Error is :" ,err);
    }
    else{
        console.log("The server is runung on port :",port);
    }
})