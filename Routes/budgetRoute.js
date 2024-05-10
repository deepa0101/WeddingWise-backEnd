const express =require("express");
const budgetController=require('../Controller/budget.controller')
const router = express.Router();


router.get("/getBudget/:id", budgetController.getBudget);
router.post("/addBudget", budgetController.addBudget);
router.put("/editBudget/:id", budgetController.changeBudget);
router.post("/removeBudget", budgetController.deleteBudget);

module.exports= router;