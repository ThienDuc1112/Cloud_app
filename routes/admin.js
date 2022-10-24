var express = require('express');
const { routes } = require('../app');
var router = express.Router();
var tableProduct = require('../Model/ShowProduct');
var selectBoxShop = require('../Model/showSelectBoxShop');
var getTableSelectProduct = require('../Model/getSelectedProduct');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let listSelectShop = await selectBoxShop();
    let tableProduct = await getTableSelectProduct('all');
    let username = req.session.user.username;
   if(username) {
    res.render('admin',{selectBox: listSelectShop,result: tableProduct})
   } else {
    res.render('/login');
   }
});

module.exports = router;
