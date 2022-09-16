const { is } = require('express/lib/request')
const User = require('../models/user')



module.exports.home = function(req,res){
    return res.render('homepage')
}
module.exports.create = function(req, res){
   
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        
        if(err){console.log('error in finding user in signing up'); return}
            
        if (!user){
            User.create(req.body, function(err){
                
                if(err){
                    console.log('error in creating user while signing up',err);
                 
                }
                   
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    })
}

module.exports.signup = function(req,res){
    return res.render('user_sign_up')
}
module.exports.signin = function(req,res){
    return res.render('user_sign_in'); 
    
}
module.exports.createsession = function(req,res){
    User.findOne({email : req.body.email}, function(err , user){
        console.log(` the data regarding user is ${user}`);
        if(err){
            console.log("There is an error while finding an user  " , err);
        }if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            return res.render('profilepage',{
                user:true,
                name : user.name,
                email : user.email
            });
    }
    else{
        return res.render('user_sign_up')
    }
    })
}

