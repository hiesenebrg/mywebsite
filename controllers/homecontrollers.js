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
module.exports.profilepage = function(req,res){
    // you must have cookie for this to retrieve that data because for this req.bosy is empty that is why a cookie
    // is set  so that you can collect data from the cookie everytime you want
    console.log(req.cookies);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err,user){
            if(err){
                console.log("there is an error while creating profilepage",err);
            }
            return res.render('profilepage',{
                user:true,
                name:user.name,
                email:user.email

            })
        })
            //if you do not put else here then both return will work and it will throw an error called "cannot set header after they are sent to the client"  
        }else{
            return res.redirect('/users/sign-in');
        }

    }
    
            

module.exports.signin = function(req,res){
    return res.render('user_sign_in'); 
    
}
module.exports.createsession = function(req,res){
    console.log(req.body);
    User.findOne({email : req.body.email}, function(err , user){
        
        if(err){
            console.log("There is an error while finding an user  " , err);
        }if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id' , user.id);
            
            return res.redirect('/users/profilepage');
    }
    else{
        return res.render('user_sign_up')
    }
    })
}

