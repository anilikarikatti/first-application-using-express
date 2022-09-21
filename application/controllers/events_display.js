const connection = require('../dbconfig/connect');


async function events_display(req,res){

        let {type} = req.query;
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

                // console.log(row);

                res.redirect('/sports')                
        }
        catch(e){
            console.log(e);
        }
}


module.exports = {events_display};

