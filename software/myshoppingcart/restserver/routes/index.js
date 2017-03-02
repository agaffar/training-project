var express = require('express');
var path = require('path');
var users = require('./users');
var products = require('./productRoute');


var appRoute = function(router) {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    console.log("home index");
    /* var p = path.join(__dirname , '../../client/index');
     console.log(p+" ooo ")*/
    res.render(path.join(__dirname , '../../client/index'));
    console.log("rendered")

  });

  router.get('/users', users);
  router.get('/api/products', products);
  router.get('/api/products/search', products);
  router.get('/api/products/category', products);
  router.get('/api/products/brands', products);


};
module.exports = appRoute;
