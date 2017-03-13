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
    getUserAddress : getUserAddress,
    saveUserProfile : saveUserProfile,
    saveAddress : saveAddress,
    deleteAddress : deleteAddress

}
function getUserProfile(req,res){
    console.log("in product toppppppp "+req.query.q)
    console.log(typeof req.query.q);
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(typeof type);
    console.log("in in user profile type "+query.userId)

    console.log(req.query);
    console.log(req.body);
    userModel.findOne({_id : query.userId}).exec(function(err1, response1){
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
function getUserAddress(req,res){

    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(req.query);
    console.log(req.body);
    ////TODO: fix comment: Use line indent rules
    userModel.findOne({_id : query.userId},{address : 1,_id : 0}).populate( {path : 'address',options: { sort: query.sortingCriteria}}).exec(function(err1, response1){

        if(err1)
        {
            console.log(err1);
        }
        else
        {

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
function saveUserProfile(req,res){

    var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var queryToUpdate = queryParam.Address;
    var userId = queryParam.userId;
    var addressObj = new addressModel(address);
    userModel.update({_id : userId},{$set : queryToUpdate}).exec(function(err1, response1){
        console.log("in userdata")
        if(err1)
        {
            console.log(err1);
        }
        else
        {
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
function saveAddress(req,res){

    var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var address = queryParam.Address;
    var userId = queryParam.userId;
    var addressObj = new addressModel(address);
    if(address._id){

        addressObj.isNew = false;
    }
    else{

        addressObj.isNew = true;
    }
    addressObj.save(function(err){

        if(err){
            console.log(err);
        }
        else
        {
            //TODO: fix comment: Use === operator everywhere
            //Reference: http://stackoverflow.com/a/523650
            if(address._id == undefined && address._id == null){
                userModel.findOne({_id : userId}).exec(function(err1, response1){
                    console.log("in userdata")
                    if(err1)
                    {
                        console.log(err1);
                    }
                    else
                    {

                        if(response1.address.length >0 ){
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
            else{
                var data = {};
                var status = "ok";
                var serv = {
                    "data" : {},
                    "status" : status
                };
                res.send(serv);
            }

        }


    });
}
function deleteAddress(req,res){

    var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var address = queryParam.Address;
    var userId = queryParam.userId;
    userModel.findOne({_id : userId}).exec(function(err1, response1){
        if(err1)
        {
            console.log(err1);
        }
        else
        {

            if(response1.address.length >0 ){

                response1.address.pop(address._id);
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

                        addressModel.remove({_id : address._id}).exec(function(err3,response2){
                            if(err3){
                                var data = {};
                                var status = "error";
                                var serv = {
                                    "data" : {},
                                    "status" : status
                                };
                                res.send(serv);
                            }
                            else{
                                var data = {};
                                var status = "ok";
                                var serv = {
                                    "data" : response2,
                                    "status" : status
                                };
                                res.send(serv);
                            }


                        });

                    }
                });
            }


        }

    });
}

module.exports = userData;