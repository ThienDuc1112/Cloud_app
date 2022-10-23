var express = require('express');
var router = express.Router();
var session = require('express-session');
var authen = require('../Model/authenticate');
var tableProduct = require('../Model/ShowProduct');
var selectBoxShop = require('../Model/showSelectBoxShop');
var getTableSelectProduct = require('../Model/getSelectedProduct');
var detailProduct = require('../Model/viewDetailProduct');
var deleteItem = require('../Model/deleteProduct');
var updateItem = require('../Model/updateProduct');
var addItem = require('../Model/addProduct');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET login page. */
router.post('', function (req, res) {
  res.render('login');
});
/* route to user or admin page. */
router.post('/login', async function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  let [authenticated, idshop, role] = await authen(username, password);
  if (authenticated == true && role == 'shop') {
    let productString = await tableProduct(idshop);
    res.render('home', { products: productString });
  } else if (authenticated == true && role == 'admin') {
    let listSelectShop = await selectBoxShop();
    let tableProduct = await getTableSelectProduct('all');
    res.render('admin', { selectBox: listSelectShop, result: tableProduct })
  } else {
    res.render('login', { notice: "wrong username or password" });
  }
});

router.post('/findShop', async function (req, res, next) {
  let name = req.body.shop;
  let listSelectShop = await selectBoxShop();
  var tableProduct = await getTableSelectProduct(name);
  res.render('admin', { Title: 'Admin', selectBox: listSelectShop, result: tableProduct })
});

router.post('/button', async function (req, res, next) {
  var action = req.body.button;
  if (action == "update") {
    var id_product = req.body.id;
    var detail = await detailProduct(id_product);
    let detail_product_string = `
    <form action="update" method="POST">
  <label for="id">ID:</label>
  <input type="text" id="fname" name="id" value="${detail.id}"><br><br>
  <label for="name">Name product:</label>
  <input type="text" id="lname" name="name" value="${detail.name}"><br><br>
  <label for="price">Price:</label>
  <input type="text" id="fname" name="price" value="${detail.price}"><br><br>
  <label for="quantity">Quantity:</label>
  <input type="text" id="lname" name="quantity" value="${detail.quantity}"><br><br>
  <input type="hidden" name="shop" value="${detail.shop}">
  <button type="submit"> Save </button>
</form>
    `;
    res.render('updateProduct', { product_detail: detail_product_string });
  } else {
    var shop = req.body.shop;
    var id_product = req.body.id;
    deleteItem(id_product);
    let productString = await tableProduct(shop);
    res.render('home', { products: productString });
  }

});

router.post('/update', async function (req, res, next) {
  let idProduct = req.body.id;
  let nameProduct = req.body.name;
  let quantityProduct = req.body.quantity;
  let priceProduct = req.body.price;
  let shop = req.body.shop;

  await updateItem(idProduct, nameProduct, quantityProduct, priceProduct);
  let productString = await tableProduct(shop);
  res.render('home', { products: productString });
});

router.post('/addProduct', async function (req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let quantity = req.body.quantity;
  let price = req.body.price;
  var idShop = req.session.shop;
  console.log(idShop);
  //  addItem(id,name,quantity,price,idShop);
  let productString = await tableProduct(idShop);
  res.render('home', { products: productString });
});
module.exports = router;
