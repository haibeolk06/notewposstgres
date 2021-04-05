const asyncHandler = require('express-async-handler');
const router = require("express").Router();
const Todo = require("../Models/Todo");

router.use((req,res,next) => {
    res.locals.title = 'Todo List';
    next();
});

router.get("/todo", asyncHandler(async (req, res) => {
    if(!req.currentUser)
    {
        res.redirect("/");
    }
    else
    {
        const data = await Todo.findAll();
        res.render("todoList/todo", { todos: data });
    }
}));

module.exports = router;