const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req,res){
    // now here req.body.post has the name set in comment form which has value post._id becvause we are checking that user must comment on the valid post
    Post.findById(req.body.post,function(err,post){
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
                post.commnents.push(comment);
                // remember to save the post while updating
                post.save();
                res.redirect('/');
            });
        }
    });

    }
