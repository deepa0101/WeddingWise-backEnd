const userModel = require( "../Model/User.js");
const Event = require("../Model/Event.js");

const addEvent =  async(req,res)=>{
    try{
        const { eventName, description ,eventType} = req.body;
        const existingEvent = await Event.find({eventName: eventName})
        if(eventName){
            res.send("A similar event already exists in our Website.")
        }
        else{
            const newEvent = await Event.create({
                eventName,
                description,
                eventType,
              });
          
              await newEvent.save();
              res.status(201).json({ message: "Event added successfully" });
        }
    }catch(error){
        console.log(error)
        res.send(error)
    }
}

const deleteEvent = async(req,res)=>{
    try{
        const event = await Event.deleteOne({eventName: req.body.eventName})
        res.send({message: "Event deleted"})
    } catch(error){
        console.log(error)
        res.send(error)
    }
}

const getEvents = async(req,res)=>{
    try{
        const events = await Event.find({});
        res.status(200).json(events)
    }catch(error){
        console.log(error)
        res.send(error)
    }
}
const getEventsByID = async(req,res)=>{
    try{
        const id=req.body._id
        const events = await Event.find({_id:id});
        res.status(200).json(events)
    }catch(error){
        console.log(error)
        res.send(error)
    }
}
module.exports = {addEvent,deleteEvent,getEvents,getEventsByID}