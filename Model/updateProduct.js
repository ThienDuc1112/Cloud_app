var pg_conn = require('./database');
async function updateProduct(id,name,quantity,price) {
    const query = {
        text: `update product set id = $1, name = $2, quantity = $3, price = $4 where id = $5`,
        values: [id,name,quantity,price,id]
    }
    var query_data = pg_conn.query(query);
    return query_data;
}
module.exports = updateProduct;