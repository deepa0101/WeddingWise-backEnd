const userModel = require( "../Model/User.js");
const Venue = require("../Model/Venue.js");

const addVenue =  async(req,res)=>{
    try{
        const { venueName, description ,venueType,contactNumber} = req.body;
        const existingEvent = await eventModel.find({eventName: eventName})
        if(eventName){
            res.send("A similar event already exists in our Website.")
        }
        else{
            const newEvent = await Venue.create({
                venueModel,
                description,
                venueType,
                contactNumber
              });
          
              await newEvent.save();
              res.status(201).json({ message: "Event added successfully" });
        }
    }catch(error){
        console.log(error)
        res.send(error)
    }
}

const deleteVenue = async(req,res)=>{
    try{
        const event = await Venue.deleteOne({eventName: req.body.eventName})
        res.send({message: "Event deleted"})
    } catch(error){
        console.log(error)
        res.send(error)
    }
}
const getVenues = async(req,res)=>{
    try{
        const venues = await Venue.find();
        res.send(venues)
    }catch(error){
        res.send(error)
    }
}
module.exports = {addVenue,deleteVenue,getVenues}