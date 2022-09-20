const mongoose = require('mongoose');
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
]
    },{
        timestamps: true
    
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;