const connection = require('../dbconfig/connect');


async function events_display(req,res){
        // console.log(req.body);
        // let {type} =req.body;
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
                // console.log(row);

                // res.json(row)
                // return row;
                res.redirect('/sports?value='+row);                
        }
        catch(e){
            console.log(e);
        }
}



module.exports = {events_display};

