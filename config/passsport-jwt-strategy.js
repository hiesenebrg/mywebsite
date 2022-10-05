const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User=   require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new JWTStrategy(opts , function(jwtPayLoad , done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log("There is an error in jwt payload", err); return;}
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
});
}));

module.exports = passport;