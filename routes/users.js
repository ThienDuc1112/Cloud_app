var express = require('express');
const { routes } = require('../app');
var router = express.Router();
var tableProduct = require('../Model/ShowProduct');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let idshop = req.session.user.shop;
  let username = req.session.user.username;
  let productString = await tableProduct(idshop);
   if(username) {
   res.render('home',{name:username,products: productString});
   } else {
    res.render('login',{notice: 'welcome'});
   }
});

module.exports = router;
