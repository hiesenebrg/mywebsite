const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req,res){
    
    // now here req.body.post has the name set in comment form which has value post._id becvause we are checking that user must comment on the valid post
    Post.findById(req.body.post,function(err,post){
        
        if(err){console.log("there is an error while find by Id",err);return ; }
        if(post){
            
            Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){
                    console.log("there is an error while creating the error",err);
                }
                // now we have to update the commen in the post collection that's why we have changes the post model 
                
                post.comments.push(comment);
                // remember to save the post while updating
                post.save();
                
                
                 res.redirect('/');
            });
        }
    });

    }
    module.exports.destroy = function(req,res){
        Comment.findById(eq.params.id , function(err,comment){
            if(comment.user == req.user.id){
                let postID = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postID, {$pull : {comments:req.params.id}},function(err,post){
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back');
            }
        })
    }
