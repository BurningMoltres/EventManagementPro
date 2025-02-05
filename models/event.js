// models/event.js
const mongoose=require('mongoose');
const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
date:{
    type:Date,
    required:true
},
time:{
    type:String,
    required:true,
    validate:{
        validator:function(time)
        {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time); // Validates HH:MM format
        },
        message: props=> `${props.value} is not a valid time!`
    }
},
description:{
    type:String,
    required:true
},
participants:{
    type:Number,
    required:true
}
})

const Event=mongoose.model("Event",eventSchema);
module.exports=Event;