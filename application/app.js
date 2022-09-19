const express = require("express");

const app = express();

const port = process.env.PORT ||3000;

const nunjucks =require("nunjucks");

const router = require('./router');
// const bodyParser = require("body-parser");

const session = require("express-session");

// const mysql = require("mysql")(session)
// const RedisStore = require('connect-redis')(session)


app.use(session({
    
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
   

  }));

// app.get('/', (req, res) => {
//   req.session.foo = 'some text here'
//   res.send('Hello World!')
//   console.log(req);
// })
app.use(express.json());

app.use(express.urlencoded({extended : true}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.get("/register",(req,res)=>{
    
    res.render('register.html');
})

app.get("/",(req,res)=>{
    // req.session.foo = "some text";
    res.render('login.html');
})


app.get("/home",(req,res)=>{
    res.render("home.html",{name:req.session.user});
    console.log(req.sessionID);
})
app.post("/registerUser",router);

app.post("/loginuser",router);

app.listen(port,()=>{
    console.log(`listening port ${port}`);
})


// app.use(passport.initialize())
// app.use(passport.session());