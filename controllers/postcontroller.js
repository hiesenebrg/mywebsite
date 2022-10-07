const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

    
module.exports.create = async function(req,res){
    try {
        await Post.create({
   
            content : req.body.content,
            // this req.user constains the data of the current signed in user and it gets due to passport-local-strategy as discussed earlier
            user : req.user._id
        }); 
        return res.redirect('back');
    } catch (error) {
        
        console.log("there is an error while creating the post", error);
    }
    

}
module.exports.destroy = async function(req,res){
    try {
    let post = await Post.findById(req.params.id);
    
        // it will delte post whose id is req,user.id
        if(post.user == req.user.id){
            // CHANGE: delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable:post, onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});
            post.remove();
                    // it will delete all the comments related to that postid
            await Comment.deleteMany({post : req.params.id});
                return res.redirect('back');

        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error' , error);
        return;
    }
            
            
        

}
