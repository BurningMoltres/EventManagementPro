// index.js
 const express = require('express');
const mongoose= require(
    'mongoose'
);
require('dotenv').config()
const app = express();
const port=3000;
const UserRegistration=require('./routes/UserRegistration');
const UserLogin=require('./routes/UserLogin');
const EventRegistration=require('./routes/EventCreation');
app.use(express.json());
app.use(express.urlencoded({encoded:true}))

//mongo connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,(err)=>{
        console.log("connected to database");
        if(err)
        {
            return err;
        }
    })
})

app.use('/registerUser',UserRegistration);
app.use('/loginUser',UserLogin);
app.use('/Event',EventRegistration);