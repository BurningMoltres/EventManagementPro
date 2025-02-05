// routes/UserLogin.js
const express = require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
require('dotenv').config()

router.post("/",async(req,res,next) => {
    const { username, password, email } = req.body;
    console.log(req.body);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(emailRegex.test(email));

    // Validate input
    if (
        typeof username !== 'string' || 
        username.trim().length <= 0 || 
        typeof password !== 'string' || 
        password.trim().length <= 0 || 
        typeof email !== 'string' || 
        email.trim().length <= 0 || 
        !emailRegex.test(email)
    ) {
        return res.status(400).json("Incorrect parameters are passed");
    }
    try
    {
        const userCredentials=await User.findOne({username});
        const isPasswordValid=await bcrypt.compare(password,userCredentials.password);
        if(!isPasswordValid)
        {
            return res.status(400).json({messsage:'Invalid email or password'})
        }
        else
        {
            const token=jwt.sign({
                email:userCredentials.email},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.send({token});
                }
    }
    catch(error)
    {
        console.log("error");
        res.status(500).json({message:'login failed'});
    }


})
module.exports=router;