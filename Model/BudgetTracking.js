const mongoose = require('mongoose');
const { type } = require('os');

const budgetSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
Name: String,
Amount: Number,

});

const Expense= mongoose.model('Expense', budgetSchema);
module.exports = Expense