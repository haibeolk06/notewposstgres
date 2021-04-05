const express = require("express");

const app = express();

const cookieSession = require("cookie-session");

const authMiddlewares = require("./middlewares/auth");

const db = require("./Models/db");

//express ejs-layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(express.json());

//session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret'],
    maxAge: 24*60*60*1000
}));

//use authMiddlewares
app.use(authMiddlewares);

//use body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.set("views", "./views");

app.use('/public', express.static('public'));

//use router
app.use(require('./routes/index'));
app.use(require('./routes/todo'));
app.use(require('./routes/auth'));

app.get("/", (req, res) => {
   res.render("home", {title: "Home"});
});

//connect to postgres
db.sync().then(function(){
    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });
}).catch(console.error);




