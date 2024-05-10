const express =require("express");
const TodoController=require('../Controller/todo.controller.js')
const router = express.Router();


router.get("/getTodo/:id", TodoController.getTodo);
router.post("/addTodo", TodoController.addTodo);
router.put("/editTodo/:id", TodoController.changeTodo);
router.post("/removeTodo", TodoController.deleteTodo);

module.exports= router;