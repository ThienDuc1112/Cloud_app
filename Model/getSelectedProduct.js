var pg_conn = require('./database');
async function getProducts(nameShop){
    var query_selectProduct;
    var query_data;
    if(nameShop == 'all'){
        query_selectProduct = {
            text: `select * from product order by id asc`
        }
    }else
    {
     query_selectProduct = {
        text: `select product.id, product.name, product.quantity,product.price, product.shop
         from product inner join shop on product.shop = shop.id
        where shop.name = $1;`,
        values: [nameShop]
    }
}
var product_table_string = `
    <table border=1>
    <tr>
`
var query_data = await pg_conn.query(query_selectProduct);
let number_column = query_data.fields.length;
for(let i = 0; i < number_column; i++){
    let head = query_data.fields[i].name;
    product_table_string += `<th> ${head} </th>`;
}
    product_table_string += `</tr>`;
    query_data.rows.forEach(product => {
        product_table_string += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.shop}</td>
        </tr>
        `
    });
    product_table_string += `</table>`;
    return product_table_string;
}
module.exports = getProducts;