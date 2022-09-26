const connection = require('../dbconfig/connect');


async function events_display(req,res){
        // console.log(req.body);
        // let {type} =req.body;

        let user = req.session.user;
        let password = req.session.password;
        console.log(req.query);
        let {type} = req.query;
        // console.log();
        console.log(type);
        let pool = await connection.pool;
        let poolPromise = await pool.promise();

        let query = `select id from event_types where event_name = ?`;
        
        try{
                let [rows]= await poolPromise.execute(query,[type]);
                let id = rows[0].id;
                // console.log(rows);
                let query2= `select * from events where category = ?`

                let [row] = await poolPromise.execute(query2,[id]);

                row=JSON.stringify(row)
                console.log(row);

                let query3 = `select id from user where name=?  and password = ?`
                
                let [user_rows] = await poolPromise.execute(query3,[user,password]);

                let user_id = user_rows[0].id;

                let query4 = `select event_id from user_register_events where user_id = ? `

                let [event_rows] =await poolPromise.execute(query4,[user_id])

                 event_rows = JSON.stringify(event_rows)
                console.log(event_rows);

                // res.json(row)
                // return row;
                res.redirect(`/sports?value=${row}&events=${event_rows}`);                
        }
        catch(e){
            console.log(e);
        }
}



module.exports = {events_display};

