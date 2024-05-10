const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    description:{ 
        type: String,
        required: true
    },
    eventType:{
        type: String,
    },
    imageUrl:{
        type: String
    }
},{
        collection: 'Event'   
})

const  Event = mongoose.model("Event",eventSchema)
module.exports = Event