var pg_conn = require('./database');
async function insertProduct(id,name,price,quantity,shop) {
    const query = {
        text: `insert into product(id,name,price,quantity,shop) values($1,$2,$3,$4,$5)`,
        values: [id,name,price,quantity,shop]
    }
    var query_data = await pg_conn.query(query);
    console.log(query_data);
}
module.exports = insertProduct;