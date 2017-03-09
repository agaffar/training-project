/**
 * Created by SB004 on 3/9/2017.
 */

var express = require('express');
var ProductModel=require('../../models/Product/ProductModel');
var OfferModel=require('../../models/Offer/Offer');
var OfferModel=require('../../models/Offer/Offer');
var userModel=require('../../models/User/UserModel');
var tokenModel=require('../../models/Token/TokenModel');
var addressModel=require('../../models/Address/AddressesModel');
var passwordHash = require('../../node_modules/password-hash/lib/password-hash');
var jwt = require('../../node_modules/jwt-simple/lib/jwt');
var tokenTypesEnums = require('../../enums/tokenTypes');
var userData
userData ={
    getUserProfile : getUserProfile,
    saveAddress : saveAddress

}
function getUserProfile(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = JSON.parse(req.query.q);
    console.log(typeof type);
    console.log("in product type "+query.tokenId)

    console.log(req.query);
    console.log(req.body);

    tokenModel.findOne({_id : query.tokenId}).exec(function(err, response){
        console.log("in token")
        if(err){
            console.log(err);
        }
        else
        {
           if(response != undefined){
               if(response != null){
                   console.log("in userdata")
                   console.log(response.email)

                   userModel.findOne({email : response.email}).populate('address').exec(function(err1, response1){
                       console.log("in userdata")
                       if(err1)
                       {
                           console.log(err1);
                       }
                       else
                       {
                           console.log("userdata response received"+response1);
                           var data = {};
                           var status = "ok";
                           var serv = {
                               "data" : response1,
                               "status" : status
                           };
                           res.send(serv);

                       }

                   });
               }
               else{
                   var data = {};
                   var status = "error";
                   var serv = {
                       "data" : data,
                       "status" : status
                   };
                   res.send(serv);
               }
           }
           else{
               var data = {};
               var status = "error";
               var serv = {
                   "data" : data,
                   "status" : status
               };
               res.send(serv);
           }
        }

    });
}
function saveAddress(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(typeof type);
    console.log("in user id "+queryParam.userId)
    console.log("in Address type "+queryParam.Address)

    console.log(req.query);
    console.log(req.body);
    var address = queryParam.Address;
    var userId = queryParam.userId;
    var addressObj = new addressModel(address);
    addressObj.save(function(err){
        console.log("in token")
        if(err){
            console.log(err);
        }
        else
        {
            userModel.findOne({_id : userId}).exec(function(err1, response1){
                console.log("in userdata")
                if(err1)
                {
                    console.log(err1);
                }
                else
                {
                    console.log("userdata response received"+response1);
                    if(response1.address){
                        response1.address.push(addressObj._id);
                        response1.save(function(err2){
                            if(err2){
                                console.log(err2);
                                var data = {};
                                var status = "error";
                                var serv = {
                                    "data" : data,
                                    "status" : status
                                };
                                res.send(serv);
                            }
                            else {
                                console.log(response1);
                                var data = {};
                                var status = "ok";
                                var serv = {
                                    "data" : response1,
                                    "status" : status
                                };
                                res.send(serv);
                            }
                        });
                    }


                }

            });
        }


    });
}

module.exports = userData;