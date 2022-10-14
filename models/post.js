const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/posts/images');
const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required: true

    },
    user: {
        // this srefers to user id
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include the array of ids of all the comment in this post schema itself
    comments :[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
], 
    likes:[
        {
        type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
    }
],   photo:{
    type :String

}
    },{
        timestamps: true
    
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..' , AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

//   static methods
// this.single('avatar) is writtern so that user can send only one file not more than that
postSchema.statics.uploadedAvatar = multer({storage:storage}).single('photo');
postSchema.statics.avatarPath = AVATAR_PATH;


const Post = mongoose.model('Post', postSchema);

module.exports = Post;