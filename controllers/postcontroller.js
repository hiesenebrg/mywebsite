const post = require('../models/post')
module.exports.create = function(req, res){
    
post.create({
   
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