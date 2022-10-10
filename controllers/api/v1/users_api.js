const User =require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/enviornment');

module.exports.createsession = async function(req,res){
    try {
        
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                messsage:"Invalid username or password"
            });
        }
        return res.json(200,{
            messsage:"Sign in Successfull , Here is your token please keep it safe!" ,
            data : {
                token : jwt.sign(user.toJSON() , env.jwt_secret , {expiresIn : '100000'})
            }
        })



    } catch (error) {
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

    
    
}