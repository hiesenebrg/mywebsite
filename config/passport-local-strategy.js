const User = require('../models/user');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
// now we have to tell passport to use local strategy
passport.use(new LocalStrategy({
    // here email is our user schema email that is email 
    usernameField:'email'
},
// please note that the email and password is automatically passed, you dont need to pass it.
function (email,password, done) {
    // find the user and establish the identity
    // do not get confuse the first email is email column of the database and the second one os the email that is passed inside the function
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('There is an error -->paassport')
        }
        if(!user || user.password!=password){
            console.log('Invalid Username/PAssword');
            return done(null, false);
        }return done(null,user);

    });
}
));

// serializing hte user to decide which key is to kept in the cookies
passport.serializeUser(function (user,done) {
    return done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("There is an error while deserializing the user");
            return done(err);
        }
        // this will set user in req.user
        return done(null,user);
    })
})

// check if the user is authenticated and also these two functions are a middleware used in route
passport.checkAuthentication = function(req, res , next){
    // if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        
        return next();
    }else{
        // if the user is not signed in 
        console.log('not authenticated');
        return  res.redirect('/users/sign-in');
    }
       
}

passport.setAuthenticatedUser = function(req, res , next){
    // if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        // req.user contains the curretn signed - in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user  = req.user;
    } 
    next();        
}

module.exports = passport;