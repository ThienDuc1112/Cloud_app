var pg_conn = require('./database');

async function authen(user, pass)
{
    var authenticated = false;
    var arr = [];
    var idshop = 0;
    var role = "shop";
    const asc_query = {
        text: "SELECT * from users where name = $1 AND passwd = $2",
        values: [user,pass]
    };
    var query_data = await pg_conn.query(asc_query);
    if(query_data.rowCount == 1){
        authenticated = true;
        idshop = query_data.rows[0].shop;
        role = query_data.rows[0].role;
    }
    arr.push(authenticated, idshop, role)
    return arr;
}

module.exports = authen;