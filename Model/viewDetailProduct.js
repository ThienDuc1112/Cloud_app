var pg_conn = require('./database');
async function viewDetailProduct(idProduct) {
   
    const shop_query = {
        text: 'SELECT * FROM product WHERE id =$1',
        values: [idProduct]
    }
    var query_data = await pg_conn.query(shop_query)
    console.log(query_data.rows);
    return query_data.rows[0];
}

module.exports = viewDetailProduct;