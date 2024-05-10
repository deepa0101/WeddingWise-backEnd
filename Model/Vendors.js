const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
    },
    rating:{
        type: Number,
    },
    service_category:{
        type: String
    },
    url:{
        type:String
    },
    imageUrl:{
        type:String
    },
    price:{
        type:Number
    },
    Status:{
        type: Array
    }
})

const  Vendor = mongoose.model("Vendor",vendorSchema)
module.exports = Vendor