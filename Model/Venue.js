const mongoose = require("mongoose");
const { type } = require("os");

const venueSchema = new mongoose.Schema({
    venueName: {
        type: String,
        required: true,
    },
    address:{
        type: String
    },
    phone:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    url:{
        type:String
    },
    rating:{
        type: Number
    },
    seating:{
        type: String
    },
    category_name:{
        type:String,
        required: true
    },
    price:{
        type: Number,
    },
    Status:{
        type:Object
    }

},{
    collection: "Venue"
})

const  Venue = mongoose.model("Venue",venueSchema);
module.exports = Venue