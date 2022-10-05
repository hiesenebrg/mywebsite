const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req,res){
    try {
    
    // now here req.body.post has the name set in comment form which has value post._id becvause we are checking that user must comment on the valid post
    let post = await Post.findById(req.body.post);
        
        
            if(post){
            
                let comment = await Comment.create({
                    content:req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
    
                    
                    
                    // now we have to update the commen in the post collection that's why we have changes the post model 
                    
                    post.comments.push(comment);
                    // remember to save the post while updating
                    post.save();
                    
                    comment = await comment.populate([{path: 'user', select: 'name'}, {path: 'user', select: 'email'}])
                        // 'user', 'name email').execPopulate();
                        commentsMailer.newComment(comment);
                     res.redirect('/');
            }
        } catch (error) {
           console.log("error" , error); 
           return;
        }
        
        }
    
    module.exports.destroy = function(req,res){
        Comment.findById(req.params.id , function(err,comment){
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
