const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../Models/User");
const asyncHandler = require('express-async-handler');

router.use((req, res, next) => {
    res.locals.title = 'Log In';
    next();
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    const found = await Users.findUserByUserName(username);
    if(found && bcrypt.compareSync(password, found.password))
    {
        req.session.userId = found.id;
        res.redirect("/");
    }
    else
    { 
        res.render("auth/login");
    }
}));

router.get("/logout", (req, res) => {
    delete req.session.userId;
    res.redirect("/");
});

module.exports = router;