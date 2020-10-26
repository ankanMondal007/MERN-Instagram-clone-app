const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    resetToken:String,
    expireToken: Date,
    pic:{
        type: String,
        default: "https://www.google.co.in/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FProfilePictures%2F&psig=AOvVaw2cD349wZDWlgpDno-_rayq&ust=1601794233550000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDcsNbql-wCFQAAAAAdAAAAABAD"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
});

 mongoose.model("User", userSchema);