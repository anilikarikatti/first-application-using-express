let database = require("../dbconfig/connect");


async  function event_types(req,res){

    
    let pool = await database.pool;

    let poolPromise =await pool.promise();

    let [rows] =await poolPromise.execute("select * from event_types order by id");

    let data = rows.map(elem=>elem.event_name);

    // console.log(data);
    // console.log(res.(data));

    res.json(data);
}

module.exports = {event_types}

