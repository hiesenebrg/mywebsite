
const User = require('../models/user')

const Post = require('../models/post');



module.exports.home = function(req,res){
    // empty paranthessis shows all the posts irrespective of user
    
    // now we are using nested population
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }       
}).exec(function(err,posts){
    console.log(posts);
        if(err){
                console.log("error while getting the post data",err)
        }
        return res.render('homepage',{
           posts:posts 
        });
        
        // return res.send( posts);
    })
    
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
    // if the user is already signed -in then he/she cannot go to signup page and redirected to the profilepage
    if(req.isAuthenticated()){
        return res.redirect('/users/profilepage');
    }
    return res.render('user_sign_up')
}
module.exports.profilepage = function(req,res){
    return res.render('profilepage');

    }
    
            

module.exports.signin = function(req,res){
    // if the user is already signed -in then he/she cannot go to sign-in page and redirected to the profilepage
    if(req.isAuthenticated()){
        return res.redirect('/users/profilepage');
    }
    return res.render('user_sign_in'); 
    
}
module.exports.createsession = function(req,res){
    // previous all manual authentiaction cose is removes beacuse now ew have used passport local strategy from the config folder

   return res.redirect('/');
    
}

