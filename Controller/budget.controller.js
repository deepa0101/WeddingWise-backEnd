const Budget = require('../Model/BudgetTracking');

const getBudget = async (req, res) => {
    try{
    const userId = req.params.id;
    const Budgets = await Budget.find({'user': userId});
    res.status(200).json(Budgets);
}catch(error){
    res.status(400).json(error)
}};

const addBudget = async (req, res) => {
    try{
        const userId = req.body.userId;
        const newBudget = Budget.create({
            user: userId,
            Name: req.body.expenseName,
            Amount: req.body.amount,
           new : true
        });
        
        res.status(200).json({message:"Created successfully",newBudget:newBudget});
    }catch(error){
    res.status(400).json(error),
    console.log(error)
}};

const changeBudget= async (req, res) => {
    try{
        const id = req.body.id;
    const userId = req.body.userId;
        const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBudget);
    }catch(error){
        res.status(400).json(error)
    }};
const deleteBudget = async (req, res) => {
    try{
        const id = req.body.id;
        const userId = req.body.userId;
        const deletedBudget = await Budget.findByIdAndDelete(req.body.id);
        res.status(200).json(deletedBudget);
    }catch(error){
        res.status(400).json(error) 
    }};

module.exports = {getBudget,addBudget,changeBudget,deleteBudget}