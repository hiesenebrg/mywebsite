


const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');



module.exports.home = async function(req,res){
    try {
        // empty paranthessis shows all the posts irrespective of user
    
        // now we are using nested population
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path : "comments",
            populate:{
                path:'user'
            }
        });
        let users = await User.find({});
        
        return res.render('homepage',{
            posts:posts ,
            all_users : users
         });   
    } catch (error) {
        console.log("there is error while populating the data", error);
        return;
    }
    // empty paranthessis shows all the posts irrespective of user
    
    // now we are using nested population
    
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
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log("there is an error in profilepage finding user",err);return;}
            return res.render('profilepage',{
                profile_user : user
            });
        })

    

    }
    module.exports.update =  async function(req,res){
        // remember this is done because suppose someone chages the profile Id from the inspect then the profile of other person
        // get updated which is a blunder so always put this check so that only the currently signed in user id must matches the
        // the id coming form the update
        

        if(req.user.id == req.params.id){
                try {
                   let user = await  User.findById(req.params.id);
                User.uploadedAvatar(req,res, function(err){
                        if(err){
                            console.log('****Multer Error: '.err)
                        }
                        user.name = req.body.name;
                        user.email = req.body.email;
    // it is juist checking if the req has file then save the file path in avatar column of user db
                        if(req.file){
                            user.avatar = User.avatarPath + '/' + req.file.filename;
                        }
                        user.save();
                        return res.redirect('back');

                });


                } catch (error) {
                    console.log('Error' , error); 
                    return res.redirect('back');
                }




        }else{
            req.flash('error' , 'Unauthorized');
            return res.status(401).send('Unauthorized hai bhai');
            }
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
        // this is showing the flash after login
    req.flash('success','Logged in Successfully');
   return res.redirect('/');
    
}
module.exports.signout = function(req,res,next){
     // this is showing the flash after login
     
    req.logout(function(err)
     {
        if (err) { return next(err); }
         // this is showing the flash after logout
        req.flash('success','You have logged out!');
    return res.redirect('/');});
}



