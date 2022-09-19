const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required: true

    },
    user: {
        // this srefers to user id
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
    },{
        timestamps: true
    
});


const Comment = mongoose.model('Post', commentSchema);

module.exports = Comment;