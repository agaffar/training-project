/**
 * Created by SB004 on 3/2/2017.
 */
var express = require('express');
var ProductModel=require('../../models/Product/ProductModel');
var OfferModel=require('../../models/Offer/Offer');

var productList
productList ={
    topRatedProducts : topRatedProducts,
    searchProducts  : searchProducts,
    productsByCategory : productsByCategory,
    getAllBrandsByType : getAllBrandsByType,
    getAllOffersType : getAllOffersType,
    getProduct : getProduct,
    getSimilarProducts : getSimilarProducts
}
function topRatedProducts(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.type)

    console.log(req.query);
    console.log(req.body);

    ProductModel.find({subType : query.type}).sort('-rating').limit(5).exec(function(err, response){
        console.log("in productlist")
        if(err)
            console.log(err);
        else
        {
            console.log("response received"+response);
            res.send(response);
        }

    });
}
function searchProducts(req,res){
    console.log("in products search "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.valueEntered)

    console.log(req.query);
    console.log(req.body);
    /*ProductModel.find({ $text: { $search: query.valueEntered } })*/
    var reg = "/^"+query.valueEntered+"/i";
    var regex = new RegExp(query.valueEntered,"i");
    console.log(reg)
    ProductModel.find({$or: [{productName: { $regex: regex }}, {brand: { $regex: regex   }}]}).exec(function(err, response){
        console.log("in productlist search")
        if(err)
            console.log(err);
        else
        {
            console.log("response received"+response+"------");
            res.send(response);
        }

    });
}
function productsByCategory(req,res){
    console.log("in categorywiseProducts "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.type)

    console.log(req.query);
    console.log(req.body);

    ProductModel.find({subType : query.type}).sort('-rating').exec(function(err, response){
        console.log("in productlist categorywiseProducts")
        if(err)
            console.log(err);
        else
        {
            console.log("categorywiseProducts response received"+response);
            res.send(response);
        }

    });
}
function getAllBrandsByType(req,res){
    console.log("in categorywiseProducts "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.type)

    console.log(req.query);
    console.log(req.body);

    ProductModel.distinct("brand",{subType : query.type}).exec(function(err, response){
        console.log("in brands list")
        if(err)
            console.log(err);
        else
        {
            console.log("brands response received"+response);
            res.send(response);
        }

    });
}
function getAllOffersType(req,res) {
   /* var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.type)

    /!*console.log(req.query);
    console.log(req.body);*!/
*/
    OfferModel.distinct("type").exec(function(err, response){
        console.log("in offers list")
        if(err)
            console.log(err);
        else
        {
            console.log("offers response received"+response);
            res.send(response);
        }

    });
}
function getProduct(req,res) {
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log("in product type "+query.productId)

    console.log(req.query);
    console.log(req.body);

    ProductModel.findOne({productId : query.productId}).populate('offers').populate('comments').exec(function(err, response){
        console.log("in productlist")
        if(err)
            console.log(err);
        else
        {
            console.log("response received"+response);
            res.send(response);
        }

    });
}
function getSimilarProducts(req,res){
    console.log("in similar toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof query);
    console.log("in similar product type "+query.subType)

    console.log(req.query);
    //console.log(req.body);
    var regex = new RegExp(query.prodId,"i");
    ProductModel.find({subType : query.subType,productId :{$not: regex}}).exec(function(err, response){
        console.log("in smilar list")
        if(err)
            console.log(err);
        else
        {

            console.log("response received"+response);
            res.send(response);
        }

    });
}
module.exports = productList;