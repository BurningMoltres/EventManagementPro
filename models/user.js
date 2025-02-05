// models/user.js
//schema file
const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255,
        trime:true
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minLength:5,
        maxLength:255,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    }
})
const User=mongoose.model("User",userSchema);
module.exports=User;