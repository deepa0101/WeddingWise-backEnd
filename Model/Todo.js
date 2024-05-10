const mongoose = require('mongoose');
const { type } = require('os');

const todoSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
task: {
    type:String
},
status:{
    type:String
},
deadline: {
    type: String, 
}
});

const Todo= mongoose.model('Todo', todoSchema);
module.exports = Todo