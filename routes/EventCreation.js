// routes/EventCreation.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Event=require('../models/event')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//jwt verification function
const verifyJwt= (req,res,next)=>{
    const token=req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
  }
    try{
      const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
      req.email=decodedToken;
      return next();
    }
    catch(error)
    {
      return(res.status(401).json({error:'Invalid or expired token'}));
    }
}

router.use(verifyJwt);

router.get("/",async(req,res,next)=>{
try{
  const events=await Event.find();
  res.status(200).json(events)
}
catch(error)
{
  res.status(500).json("Error fetching results");
}

})

router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: "Id is mandatory" });  
  }

  try {
   A
    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(id);

    // If no event is found with the provided ID
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
  
    res.status(500).json({ message: "Error deleting event" });
  }
});

  


router.post("/", async (req, res, next) => {
  const {name, date, time, description, participants } = req.body;
  let newDate=new Date(date);
  
  if (typeof name !== 'string' || name.trim().length <= 0) {
    return res.status(400).json({ error: "Name of event cannot be empty" });
  }

  if (
    !(newDate instanceof Date) || isNaN(newDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    } 
    if (typeof time !== 'string' || time.length !== 5 || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      return res.status(400).json({ error: "Invalid time format (HH:MM)" });
    }
    if (typeof description !== 'string' || description.trim().length <= 0) {
      return res.status(400).json({ error: "Description cannot be empty" });
    }
    if (typeof participants !== 'number' || participants <= 0) {
      return res.status(400).json({ error: "Participants must be a positive number" });
    }
  

  try {
    const newEvent = new Event({
      name:name,
      date: date,
      time: time,
      description: description,
      participants: participants,
    });

    await newEvent.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {

    res.status(500).json({ message: "Error registering user" });
  }
});


// PUT: Update an event by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {name, date, time, description, participants } = req.body;
//specify new for updated document
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id.toString(), {name, date, time, description, participants }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {

    res.status(500).json({ message: 'Error updating event' });
  }
});
module.exports = router;
