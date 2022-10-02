const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use the new strategy for google login
passport.use(new googleStrategy({
    clientID : "162091031643-atpaovb2al8j1heg70cptkeco3bf3pif.apps.googleusercontent.com",
    clientSecret :" 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",
    callbackURL : "http://localhost:8000/users/auth/google/callback", 
},
function(accessToken , refreshToken  , profile, done ){
    // find a user  
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
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