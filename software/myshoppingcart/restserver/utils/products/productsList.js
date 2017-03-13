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
            var data = {};
            var status = "ok";
            var serv = {
                "data" : response,
                "status" : status
            };
            res.send(serv);

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
            var data = {};
            var status = "ok";
            var serv = {
                "data" : response,
                "status" : status
            };
            res.send(serv);
        }

    });
}
function productsByCategory(req,res){
    console.log("in categorywiseProducts "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    //console.log(typeof type);
    console.log("in product type "+query.type)
    var offersSelectedArray = query.offersSelected;
    var brandsSelectedArray = query.brandsSelected;
    console.log(req.query);
    console.log(req.body);

    var queryTo =[];
    queryTo.push({ "$unwind": "$offers" });
    queryTo.push({$lookup : { from : "offers",localField : "offers",foreignField : "_id", as : "prodObject"}});
    queryTo.push({ "$unwind": "$prodObject" });
    queryTo.push({"$match" : {"subType" : query.type, "productPrice" : {$gt : query.min,$lt : query.max}}});
   /*/!* queryTo.$unwind = "$prodObject";
    queryTo.subType = query.type;
    queryTo.productPrice = {$gt : query.min, $lt :query.max};*!/
    queryTo.offers = {};*/
   /* {"$match" : {"prodObject.type" : { $in : ["discount","exchange"]},
        "subType" : "mobile","brand" : {$in : ["Samsung","Lenovo"]}, "productPrice" : {$gt : 1000,$lt : 20000}}}*/
    if(offersSelectedArray != undefined){
        if(offersSelectedArray.length !=0){
            //queryTo.offers.type = {$in : offersSelectedArray};
            queryTo.push({"$match" : {"prodObject.type" : {$in : offersSelectedArray}}});
            console.log("quertoooo + "+queryTo)
            console.log(queryTo)
        }
    }
    if(brandsSelectedArray != undefined){
        if(brandsSelectedArray.length !=0){
            var regexBrandArray = getRegexsBrands(brandsSelectedArray);
            if(query.type == "fiction" || query.type == "comics" || query.type == "Biography")
                queryTo.push({"$match" : {"Features.Publisher" : {$in : regexBrandArray}}});
            else
                queryTo.push({"$match" : {"brand" : {$in : regexBrandArray}}});
        console.log("quertoooo + "+queryTo)
        console.log(queryTo)
        }
    }
    console.log("quertoooo formed + "+queryTo)

    console.log(queryTo)
   /* aggregate([{ "$unwind": "$offers" },
        {$lookup : { from : "offers",localField : "offers",foreignField : "_id", as : "prodObject"}},
        { "$unwind": "$prodObject" },{"$match" : {"prodObject.type" : { $in : ["discount","exchange"]}}} ])*/
    ProductModel.aggregate(queryTo).exec(function(err, response){
        console.log("in productlist categorywiseProducts")
        if(err)
            console.log(err);
        else
        {
            console.log("categorywiseProducts response received"+response.length);
            var data = {};
            var status = "ok";
            var serv = {
                "data" : response,
                "status" : status
            };
            res.send(serv);
        }

    });
}
function getAllBrandsByType(req,res){
    console.log("in all brands "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.type)

    console.log(req.query);
    console.log(req.body);
    var queryTo ={};
    queryTo.subType = type;
    var reqBrand = "";
    if(query.type == "fiction" || query.type == 'comics' || query.type == 'Biography')
        reqBrand = "Features.Publisher";
    else
        reqBrand = "brand";
    var regex = new RegExp(query.type,"i");
    console.log(reqBrand+"  reqBrand")
    ProductModel.distinct(reqBrand,{subType : regex }).exec(function(err, response){
        console.log("in brands list")
        if(err)
            console.log(err);
        else
        {
            console.log("brands response received"+response);
            var data = {};
            var status = "ok";
            var serv = {
                "data" : response,
                "status" : status
            };
            res.send(serv);
        }

    });
}
//TODO: fix comment: Remove unused code
function getAllOffersType(req,res) {
    var query = JSON.parse(req.query.q);

    console.log("in product get offer type "+query.type)

    console.log(req.query);
    console.log(req.body);
    ProductModel.populate('offers').distinct("offers",{subType : query.type}).exec(function(err, response){
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
            var data = {};
            var status = "ok";
            var serv = {
                "data" : response,
                "status" : status
            };
            res.send(serv);
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
    ProductModel.find({subType : query.subType,productId :{$not: regex}}).sort({rating : -1}).exec(function(err, response){
        console.log("in smilar list")
        if(err)
            console.log(err);
        else
        {
            console.log("response received"+response);
            var data = {};
            var status = "ok";
            var serv = {
                "data" : response,
                "status" : status
            };
            res.send(serv);
        }

    });
}
function getRegexsBrands(brandsSelectedArray){
    var regexArray = [];
    for(var i = 0; i<brandsSelectedArray.length; i++){
        var regex = new RegExp(brandsSelectedArray[i],"i");
        regexArray.push(regex);
    }
    return regexArray;
}
module.exports = productList;