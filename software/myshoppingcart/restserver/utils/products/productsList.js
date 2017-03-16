/**
 * Created by SB004 on 3/2/2017.
 */
var express = require('express');
var ProductModel=require('../../models/Product/ProductModel');
var OfferModel=require('../../models/Offer/Offer');
var successResponse = require('../../models/successResponse');
var errorResponse = require('../../models/errorResponse');

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
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));

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
    var reg = "/^"+query.valueEntered+"/i";
    var regex = new RegExp(query.valueEntered,"i");
    //console.log(reg)
    ProductModel.find({$or: [{productName: { $regex: regex }}, {brand: { $regex: regex   }}]}).exec(function(err, response){
        console.log("in productlist search")
        if(err)
        {
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
            console.log(err);
        }
        else{
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));
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
    queryTo.push({"$match" : {"subType" : query.type, "productPrice" : {$gt : query.min,$lt : query.max}}});
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
    queryTo.push({ "$unwind": "$offers" });
    queryTo.push({$lookup : { from : "offers",localField : "offers",foreignField : "_id", as : "offers"}});
    queryTo.push({ "$unwind": "$offers" });

    if(offersSelectedArray != undefined){
        if(offersSelectedArray.length !=0){
            queryTo.push({"$match" : {"offers.type" : {$in : offersSelectedArray}}});

        }
    }
    queryTo.push({"$group":{"_id":"$_id", "data":{"$addToSet":{"off":"$offers", "product":{"_id": "$_id", "productId" : "$productId","productName" : "$productName",
            "productPrice" : "$productPrice","rating" : "$rating","type" : "$type","subType" : "$subType"
        }}}}},
        {"$project":{"data.off":1, "product":{"$arrayElemAt":["$data.product", 0] }}}
    );
    console.log("quertoooo formed + "+queryTo)

    console.log(queryTo)

    ProductModel.aggregate(queryTo).exec(function(err, response){
        console.log("in productlist categorywiseProducts")
        if(err)
        {
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
            console.log(err);
        }
        else
        {
            console.log("categorywiseProducts response received"+response.length);
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));
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
        {
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
            console.log(err);
        }
        else
        {
            console.log("brands response received"+response);
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));
        }

    });
}
function getAllOffersType(req,res) {
    var query = JSON.parse(req.query.q);

    console.log("in product get offer type "+query.type)

    console.log(req.query);
    console.log(req.body);
    ProductModel.populate('offers').distinct("offers",{subType : query.type}).exec(function(err, response){
        console.log("in offers list")
        if(err)
        {
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
            console.log(err);
        }
        else
        {
            console.log("offers response received"+response);
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));
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
        {
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
            console.log(err);
        }
        else
        {
            console.log("response received"+response);
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));
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
        {
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
            console.log(err);
        }
        else
        {
            console.log("response received"+response);
            var data = response;
            res.send(new successResponse('ok',data,'',"success"));
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