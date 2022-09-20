const express = require("express");


const port = process.env.PORT ||3000;

const nunjucks =require("nunjucks");

const router = require('./router');
// const bodyParser = require("body-parser");

const session = require("express-session");
// const MongoStore = require('connect-mongo');
// const mysql = require("mysql")(session)
// const RedisStore = require('connect-redis')(session)

const app = express();

app.use(express.static("public"));


app.use(session({
    
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({mongoUrl: 'mongodb://localhost/test-app'})


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
    // if(req.session.user){
        // res.render("home.html",{name:req.session.user});
        res.render("home.html")
        console.log(req.sessionID);
    // }
    // else{
    //     res.render("login.html")
    // }
})

app.get("/contact",(req,res)=>{
    res.render("contact.html")
})
app.post("/registerUser",router);

app.post("/loginuser",router);

app.get("/logout",router);


app.listen(port,()=>{
    console.log(`listening port ${port}`);
})


// app.use(passport.initialize())
// app.use(passport.session());