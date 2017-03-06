/**
 * Created by SB004 on 3/6/2017.
 */

var express = require('express');
var sendmail = require('sendmail')();
var userModel=require('../../models/User/UserModel');
var tokenModel=require('../../models/Token/TokenModel');
var passwordHash = require('../../node_modules/password-hash/lib/password-hash');
var jwt = require('../../node_modules/jwt-simple/lib/jwt');
var tokenTypesEnums = require('../../enums/tokenTypes');
var i=1;
var userList;
userList ={
  checkUserEmails : checkUserEmails,
    createRegisterUser : createRegisterUser,
    confirmRegistration : confirmRegistration
}
function confirmRegistration(req,res){
    console.log("updating user state")
    var query = JSON.parse(req.query.q);

    console.log("query "+query);
    var reg_token = query.reg_token;
    console.log("user reg_token  : "+reg_token);
    userModel.find({email : emailId}).exec(function(err, response){
        console.log("in users")
        if(err)
            console.log(err);
        else
        {
            console.log("users email received"+response.length);
            res.send(response);
        }

    });
}
function createRegisterUser(req,res){
    console.log("in creating user emails")
    var query = JSON.parse(req.query.q);

    console.log("query "+query);
    console.log(query);
    var userDetails = query.userDetails;
    var hashedPassword = passwordHash.generate(userDetails.paswd);
    var queryTo = {};
    queryTo.firstName = userDetails.fname;
    queryTo.lastName = userDetails.lname;
    queryTo.email = userDetails.mailId;
    queryTo.password = hashedPassword;
    queryTo.phoneNumber = userDetails.phno;
    queryTo.startDate = Date.now();
    queryTo.updatedDate = Date.now();
    queryTo.isActive = false;
    console.log("user  hashedPassword : "+hashedPassword);
    var user =userModel(queryTo);
    user.save(function(err){
        console.log("in users")
        if(err)
            console.log(err);
        else
        {
            console.log("users email received");
            //res.send(response);
        }

    });
    /*console.log("token genration ")
    var userLoad = {email : queryTo.email}
    var secret = require('./secret');
    var token = jwt.encode(userLoad,secret());
    console.log("token ------ "+token)*/
    var token = generateToken(queryTo.email);
    var querToken = {};
    querToken.email = queryTo.email;
    querToken.startDate = Date.now();
    querToken.updatedDate = Date.now();
    querToken.token = token;
    var tokenType = tokenTypesEnums.REGISTRATION.code;
    var serverAddress = req.protocol + '://' + req.get('host');
    querToken.type = tokenType;
    var tokenObj = tokenModel(querToken);
    tokenObj.save(function(err){
        if(err)
        {
            console.log("errorrrr : "+err);
        }
        else {
            console.log("created "+i);
            sendmail({
                from: 'abdulgaffar09@gmail.com',
                to: querToken.email,
                subject: 'confirm your registration',
                html: serverAddress+"/#/confirmregistration/:"+token,
            }, function(err, reply) {
                console.log(err && err.stack);
                //console.dir(reply);
            });
            res.send("created")
        }

    });

}
function generateToken(emailId){

    var userLoad = {email : emailId}
    var secret = require('./secret');
    var token = jwt.encode(userLoad,secret());
    console.log("token ------ "+token)
    return token;
}
function checkUserEmails(req,res){
    console.log("checking emails")
    var query = JSON.parse(req.query.q);

    console.log("query "+query);
    var emailId = query.emailId;
    console.log("user email entered : "+emailId);
    userModel.find({email : emailId}).exec(function(err, response){
        console.log("in users")
        if(err)
            console.log(err);
        else
        {
            console.log("users email received"+response.length);
            res.send(response);
        }

    });
}
module.exports = userList;