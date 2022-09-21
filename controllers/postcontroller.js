const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req, res){
    
Post.create({
   
    content : req.body.content,
    // this req.user constains the data of the current signed in user and it gets due to passport-local-strategy as discussed earlier
    user : req.user._id
},function(err,post){
    if(err){
        
        console.log("Error while dreating the post");
    }
    
    return res.redirect('back');
})
}
module.exports.destroy = function(req,res){
    Post.findById(req.params.id , function(err,post){
            // it will delte post whose id is req,user.id
            
        if(post.user == req.user.id){
            post.remove();
                    // it will delete all the comments related to that postid
            Comment.deleteMany({post : req.params.id} , function(err){
                return res.redirect('back');
            })

        }else{
            return res.redirect('back');
        }
    })
}