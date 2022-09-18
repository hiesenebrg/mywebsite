const express = require('express');
const cookieparser = require('cookie-parser');
const port = 8000;
const mongoose = require("mongoose");
const app = express();
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(cookieparser());
app.use(express.urlencoded());

app.use('/', require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
// using the session
app.use(session({
    name:"mywebsite",
    //TODO change the secret before the deployment in production mode
    secret : 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

// do not know why this passport.session() if we already use express session above
app.use(passport.initialize());
app.use(passport.session());



app.listen(port,function(err){
    if(err){
        console.log("Error is :" ,err);
    }
    else{
        console.log("The server is runung on port :",port);
    }
})