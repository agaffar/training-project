var express = require('express');
var ProductModel=require('../models/Product/ProductModel');
var router = express.Router();
var productsList = require('../utils/products/productsList');
/* GET products listing. */
router.get('/api/products', productsList.topRatedProducts);
router.get('/api/products/search', productsList.searchProducts);
router.get('/api/products/category', productsList.productsByCategory);
router.get('/api/products/brands', productsList.getAllBrandsByType);
//router.get('/api/products/offers', productsList.getAllOffersType);
router.get('/api/products/viewproduct', productsList.getProduct);
router.get('/api/products/viewproduct/similarProducts', productsList.getSimilarProducts);

module.exports = router;
