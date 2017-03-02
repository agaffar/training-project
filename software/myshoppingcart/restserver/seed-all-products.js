/**
 * Created by SB004 on 2/28/2017.
 */
var async = require('async');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var fs = require("fs");
var ProductModel=require('./models/Product/ProductModel');
var CommentModel=require('./models/Comment/CommentModel');
var OfferModel=require('./models/Offer/Offer');

var Q = require('q');

var dateFormat = require('dateformat');
var moment = require('moment');
mongoose.connect('mongodb://localhost/myshoppingCart');
var db = mongoose.connection;
var dbCollection = db.collections;
console.log("connected and collections are : "+dbCollection);
//console.log(dbCollection);
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("../client/dataset.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
console.log("length = "+jsonContent.length);
var allProducts = [];
var allComments = [];

for(var i = 0; i<jsonContent.length; i++){
    var eachProd = jsonContent[i];
    var prodFields = {};
    insertProductToModel(eachProd);

    /*for(var key in eachProd){
        if(key == 'comments'){
            allComments = insertComments(eachProd.id,eachProd[key],allComments);
        }
        else {
            prodFields[key] = eachProd[key];
        }
    }
    allProducts.push(prodFields);*/
}
console.log(allProducts.length);
console.log("comments length = "+allComments.length);

for(var j in allProducts)
{
    var eachProduct = allProducts[j];
    //console.log(allProducts[j]);
    insertProductToModel(eachProduct);

}


function insertComments(prodId,prodComments,allComments){
    for(var i=0;i<prodComments.length;i++){
        var eachComment = prodComments[i];
        var insComment = {};
        insComment.productId = prodId;
        for(var key in eachComment){
            insComment[key] = eachComment[key];
            }
        allComments.push(insComment);
    }
    return allComments;
}

function insertProductToModel(eachProduct){
    var newProduct ={};
    //console.log(eachProduct);
    console.log("prod id "+eachProduct.id);
    newProduct.productId = eachProduct.id;
    newProduct.productName = eachProduct.name
    newProduct.productPrice = eachProduct.price;
    newProduct.description = eachProduct.description;
    newProduct.type = eachProduct.type;
    newProduct.brand = eachProduct.brand;
    newProduct.subType = eachProduct.subType;
    newProduct.Author = eachProduct.Author;
    newProduct.rating = eachProduct.rating;
    newProduct.offers = [];
    newProduct.comments = [];
    //product.push(eachProduct);
    var allOfferIds = [];
    var allCommentIds = [];
    var promises = [];
    eachProduct.offers.forEach(function(eachOffer) {
        //console.log(allProducts[j]);
        promises.push(insertofferToModel(newProduct,eachOffer));
    });
    eachProduct.comments.forEach(function(eachComment) {
        promises.push(insertCommentToModel(newProduct, eachComment));
    });
    Q.allSettled( promises ).then(function (resp) {
        var product = ProductModel(newProduct);
        //console.log(newProduct);
        product.save(function (err) {
            if (err) {
                console.log(err);
                //return err;
            }
            else {
                console.log("products saved");
            }
        });
    });

   /* for(var j in eachProduct.comments)
    {
        var eachComment = eachProduct.comments[j];
        console.log("user : "+eachComment.username);
        allCommentIds.push(insertCommentToModel(eachProduct.id,eachComment));

    }*/
    //allComments = eachProduct.comments;
    //var productId = product._id;

}
function insertofferToModel(prod,eachOffer){
    var newOffer ={};
    var deffered = Q.defer();
    /* productId: 'ELEC_PRD_33',
     text: 'Delightful',
     rating: '4',
     commentedOn: '13/01/2017',
     username: 'Rajesh kumar Nimmagadda'*/
    //console.log("prod id  "+eachComment.productId+" commented by "+eachComment.username+" on "+new Date(eachComment.commentedOn));
    newOffer.type = eachOffer.type;
    newOffer.percentage = eachOffer.percentage;
    newOffer.amount = eachOffer.amount
    var offer = OfferModel(newOffer);

    offer.save(function (err) {
        //console.log("dateform = "+dateform);
        if (err) {
            //console.log(eachComment.productId+" comment.commentedOn = "+comment.commentedOn+" by "+eachComment.username);
            console.log(err);
            deffered.reject("reject");
            //return err;
        }
        else {
            prod.offers.push(offer._id);
            deffered.resolve();
        }
    });
    return deffered.promise;

}
function insertCommentToModel(prod,eachComment){
    var newComment ={};
    var deffered = Q.defer();

    /* productId: 'ELEC_PRD_33',
         text: 'Delightful',
         rating: '4',
         commentedOn: '13/01/2017',
         username: 'Rajesh kumar Nimmagadda'*/
    //console.log("prod id  "+eachComment.productId+" commented by "+eachComment.username+" on "+new Date(eachComment.commentedOn));
    //newComment.productId = productId;
    newComment.username = eachComment.username;
    newComment.rating = eachComment.rating
    newComment.text = eachComment.text;
    var date = moment(eachComment.commentedOn.toString(), 'DD/MM/YYYY');
    var formatedDate = date.format('MM/DD/YYYY');
    var formatedIso = dateFormat(formatedDate, "isoDateTime");
    //console.log(" formated date"+formatedIso);// 20120412
    newComment.commentedOn = formatedIso;
    var comment = CommentModel(newComment);
    var dateform = comment.commentedOn;
    //product.push(eachProduct);
    comment.save(function (err) {
        //console.log("dateform = "+dateform);
        if (err) {
            //console.log(eachComment.productId+" comment.commentedOn = "+comment.commentedOn+" by "+eachComment.username);
            console.log(err);
            console.log("errorrr");

            deffered.reject("rejected");
        }
        else {
            prod.comments.push(comment._id);
            deffered.resolve();
        }
    });
    return deffered.promise;
}