var pg_conn = require('./database');
async function showProduct(id_shop){
    const shop_query = {
        text: 'SELECT * FROM product WHERE shop =$1',
        values: [id_shop]
    }
    var query_data = await pg_conn.query(shop_query);

    let productString = '';
    query_data.rows.forEach(product => {
      productString += `
          <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.quantity}</td>
              <td>${product.price}</td>          
              <form method="POST" action="/button">
              <td><button type="submit" value="update" name="button">Update</button>
              <input type="hidden" value="${product.id}" name="id"></td>
              <input type="hidden" value="${product.shop}" name="shop"></td>
              <td><button type="submit" value="delete" name="button">Delete</button>                       
              </form>
          </tr>     
      `
    });
    return productString;
}
module.exports = showProduct;