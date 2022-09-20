
// const e = require("express");
const session = require("express-session");
const connection = require("../dbconfig/connect")


async function registerUser(req,res){
    const {name,password} = req.body;
    let pool = await connection.pool;

    let query = `insert  into user (name ,password) values(?,?)`

    try{
        const rows = await pool.execute(query,[name,password]);

        res.redirect("/");
        // console.log("anil");
        
    }
    catch(e){
        console.log(e.message);
        res.redirect("/")

    }
}


async function loginUser(req,res){
    const {name,password} = req.body;

    const pool = await connection.pool;

    const poolPromise = pool.promise();

    let query = `select name, password from user where name=? and  password = ?`;

    try{
        let [rows] = await poolPromise.execute(query,[name,password]);
        console.log(rows);
        if(rows.length == 1){
            if(req.session.user == name &&  
                req.session.password == password){
                console.log("already set");
                res.redirect("/home");

            }
            else{
                    req.session.user = name;
                    req.session.password = password
                console.log("now set session");
                res.redirect("/home");

            }
        }
        else{
            throw new Error("wrong password or username");
        }
        // console.log(rows);
    }
    catch(e){
        console.log(e.message);
        res.redirect("/")

    }
  
}

async  function logout(req,res){

    console.log("logout clicked");
    req.session.destroy();
    res.redirect("/")
}

module.exports ={registerUser,loginUser,logout}