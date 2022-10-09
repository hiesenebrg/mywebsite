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
const passportJWT = require('./config/passsport-jwt-strategy');
// when the server restarts all the cookie deleted means user is getting signout so  to prevent 
// this we are using connect-mongo so that even the server resatrts our session-cookie remains working that measn user remains loggedin
const MongoStore =  require('connect-mongo');
const flash = require('connect-flash');
const custMWare = require('./config/middleware');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// setting up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(9000);
console.log('chat server is listening on port 9000');

app.use(cookieparser());
app.use(express.urlencoded());
app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads' , express.static(__dirname + '/uploads'));

app.set('view engine','ejs');
app.set('views','./views');
// please note that this sessionis used for passport local strategy that means whenever user is authentiacted using passport -local -strategy then
// then we have to create a express-session to tokenize the cokkie by passport.serializeUser
// using the session
app.use(session({
    name:"mywebsite",
    //TODO change the secret before the deployment in production mode
    // this secret key is tokeizing the cookie that  is passed through the passport.serializeUser
    secret : 'blahsomething',
    // saveUnitiakized means do we want to accept the data also when user is not signed in
    saveUninitialized:false,
    // resave means do we want to save again and again the session cookie
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    // mongo store is used to store the session cookie in the db
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/mywebsite_dbb',
        autoRemove: 'disabled'
    },function(err){
                console.log(err || 'connect-mongodb setup ok');}
    )
            
}));


// do not know why this passport.session() if we already use express session above
app.use(passport.initialize());
app.use(passport.session());
// this will runthe function and set req.user to res.locals.user the the user is signed in
app.use(passport.setAuthenticatedUser);
// the flash should be after the session as it work on behalf of  session cookie
app.use(flash());
app.use(custMWare.setFlash);
// use the route here after the passport local trategy and express session
app.use('/', require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log("Error is :" ,err);
    }
    else{
        console.log("The server is runung on port :",port);
    }
})