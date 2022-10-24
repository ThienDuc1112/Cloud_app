var pg_conn = require('./database');
async function getShop(id_shop){
    const shop_query = {
        text: 'SELECT * FROM shop WHERE id =$1 ',
        values: [id_shop]
    }
    var query_data = await pg_conn.query(shop_query);
    return query_data.rows[0];
}
module.exports = getShop;