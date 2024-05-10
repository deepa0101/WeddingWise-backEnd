const Todo = require('../Model/Todo');

const getTodo = async (req, res) => {
    try{
    const userId = req.params.id;
    const todos = await Todo.find({'user': userId});
    res.status(200).json(todos);
}catch(error){
    res.status(400).json(error)
}};

const addTodo = async (req, res) => {
    try{
        const userId = req.body.userId;
        const newTodo = Todo.create({
            user: userId,
            task: req.body.task,
            status: req.body.status,
           deadline: req.body.deadline,
           new : true
        });
        
        res.status(200).json({message:"Created successfully",newTodo:newTodo});
    }catch(error){
    res.status(400).json(error),
    console.log(error)
}};

const changeTodo= async (req, res) => {
    try{
        const id = req.body.id;
    const userId = req.body.userId;
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    }catch(error){
        res.status(400).json(error)
    }};
const deleteTodo = async (req, res) => {
    try{
        const id = req.body.id;
        const userId = req.body.userId;
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTodo);
    }catch(error){
        res.status(400).json(error) 
    }};

module.exports = {getTodo,addTodo,changeTodo,deleteTodo}