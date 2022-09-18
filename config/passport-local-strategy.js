const User = require('../models/user');
const passport = require('passport');
const { deleteOne } = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
// now we have to tell passport to use local strategy
passsport.use(new LocalStrategy({
    // here email is our user schema email that is email 
    usernameField:'email'
},
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
    done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById({id},function(err,user){
        if(err){
            console.log("There is an error while deserializing the user");
            return done(err);
        }
        return done(null,user);
    })
})

module.exports = passport;