const mongoose = require('mongoose');


const freindshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    to_user:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
    
}, {
    timestamps: true
});


const Friends = mongoose.model('Friends', freindshipSchema);
module.exports = Friends;