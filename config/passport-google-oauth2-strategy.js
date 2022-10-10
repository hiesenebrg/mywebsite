const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./enviornment');
const User = require('../models/user');

// tell passport to use the new strategy for google login
passport.use(new googleStrategy({
    clientID : env.google_client_id,
    clientSecret :env.google_client_secret,
    callbackURL : env.google_callback_url, 
},
function(accessToken , refreshToken  , profile, done ){
    // find a user  
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        console.log(user);
        if(err){
            console.log("there is an error while google oauth", err);
            return;
        }
        console.log(profile);
        // is user has alrerady signed in , set this user s req.user
        if(user){
            return done(null,user);
            // other wise create the user using the user's googel credentials and set it as req.user
        }else{
                User.create({
        name : profile.displayName,
        email:profile.emails[0].value,
        password  : crypto.randomBytes(20).toString('hex')     
        }, function(err,user){
            if(err){
                console.log("there is an error while google oauth", err);
                return;
            }
            return done(null,user);
        });
        }
    });
    
}

));

module.exports = passport;