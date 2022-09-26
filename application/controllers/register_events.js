const connection = require('../dbconfig/connect');


async function register_events(req,res){

    let pool = await connection.pool;

    let pool_promise = await pool.promise();

    let {id}=await req.query;

    console.log(id);

    let user = req.session.user;
    let password = req.session.password;

    console.log(user,password);

    let query = `select id from user where name=?  and password = ?`


    try{

        let [rows] = await pool_promise.execute(query,[user,password]);

        let user_id = rows[0].id;

        let query2 =   `insert into user_register_events (user_id,event_id) values(?,?)` ;

        let data = await pool_promise.execute(query2,[user_id,id])
        // console.log(data);
        res.json('successs');
    }
    catch(e){
        console.log(e);
        res.send('not success');
    }

}


async function cancelRegister(req,res){


    let pool = await connection.pool;

    let pool_promise = await pool.promise();

    let {id}=await req.query;

    console.log(id);

    let user = req.session.user;
    let password = req.session.password;

    console.log(user,password);

    let query = `select id from user where name=?  and password = ?`;
    
    try{
        
        let [rows] = await pool_promise.execute(query,[user,password]);

        let user_id = rows[0].id;


         let query2 = `delete from user_register_events where user_id=? and event_id = ?;`

       let data = await pool_promise.execute(query2,[user_id,id]) ;

    res.json("deleted")

    }
    catch(e){
        res.json(e)
    }
}

module.exports={register_events,cancelRegister}