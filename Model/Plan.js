const mongoose = require('mongoose');
const userModel = require('./User');
const {eventSchema, eventModel } = require('./Event');
const { default: mongooseAutoPopulate } = require('mongoose-autopopulate');
const planSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user id is required"],
        autopopulate: true
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        autopopulate: true
    },
    eventDate:{
        type: String,
    },
    venue:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        autopopulate: true
    },
    vendor:[
        {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    autopopulate: true
}],
    budget:{
        type: Object
    }},{
         collection: 'Plan'
    })

planSchema.plugin(require('mongoose-autopopulate'))

const  Plan = mongoose.model("Plan",planSchema);
module.exports = Plan