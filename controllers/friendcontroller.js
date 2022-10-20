const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const fs = require('fs');
const path = require('path');
const Friends = require('../models/friendship');


module.exports.create = async function(req, res){
        Friends.create({
            from_user:req.user.id,
            to_user : req.params.id
        }, function(err){
            if(err){
                console.log("There is an error" , err);
            }
        
            
        });
        let friends = await Friends.findOne({from_user:req.user.id , to_user: req.params.id});
            console.log(friends);
            
            User.friendship.push(friends);
            User.save();
        
        return res.redirect('/');
}