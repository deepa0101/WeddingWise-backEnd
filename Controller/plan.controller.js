const userModel = require( "../Model/User.js");
const eventModel = require("../Model/Event.js");
const planModel = require("../Model/Plan.js")
const addEventToPlan = async(req,res)=>{
    try{
        const id = req.body.userId
        const eventid = req.body._id;
        const Date = req.body.Date;
        const existing = await planModel.find({user: id, event: eventid})
        console.log(existing)
        if(existing.length>0){ 
            return res.send('Event already added')
        }
        else 
        {
            const newPlan = await planModel.create({
            user: id,
            event:eventid,
            eventDate: Date,
            new : true}
        )
        console.log(newPlan._id)

        const updateUserPlan = await userModel.findOneAndUpdate({_id:req.userId},
        {$push: {plannedEvents:newPlan._id}},
        {new: true})
        res.status(200).json({newPlan,updateUserPlan,message:"Event Added to plan"})}
    }catch(error){
        res.status(400).json(error)
        console.log(error)
    }
}
const removeEventFromPlan = async(req,res)=>{
    try{
        
        const id  = req.body._id;
        await planModel.findOneAndDelete({ "_id": id })
        res.status(200).json({message:"removed successfully"})
        }
    catch(error){
        console.log(error)
        res.status(400).json({message:error})
    }
}

const addVenueToEvent = async(req,res)=>{
    try{
        const userId = req.body.userId
        const eventid = req.body.eventid;
        const _id = req.body._id;
        const newPlan = await planModel.findOneAndUpdate(
            { "user": userId,"event": eventid },
            { venue: _id},
            {new: true})
        res.status(200).json({newPlan,message:"Venue Added to plan"})
    }catch(error){
        console.log(error)
        res.status(400).json({error})
    }
}

const addVendorToEvent = async(req,res)=>{

    try{
        const userId = req.body.userId
        const eventid = req.body.eventid
        const _id = req.body._id;
        const newPlan = await planModel.findOneAndUpdate(
            { "user": userId,"event": eventid },
            {$addToSet: { vendor: _id}},
            {new: true})
        res.status(200).json(newPlan,"Vendor Added to plan")
    }catch(error){
        res.status(400).json(error)
    }
}
const getPlan = async(req,res)=>{
    try{
    const id = req.params.id
    const plan = await planModel.find({"user": id})
        res.status(200).json(plan)
        
    }
    catch(error){
        res.status(400).json(error)
    }
}
module.exports = {addEventToPlan,removeEventFromPlan,getPlan,addVenueToEvent,addVendorToEvent}
