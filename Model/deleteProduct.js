var pg_conn = require('./database');
async function deleteProduct(idProduct) {
    const query = {
        text: `delete from product
                where id = $1`,
        values: [idProduct]        
    }
    var query_data = await pg_conn.query(query);
}
module.exports = deleteProduct;