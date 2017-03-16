/**
 * Created by SB004 on 3/6/2017.
 */

var express = require('express');
var sendmail = require('sendmail')();
var nodemailer = require("nodemailer");
var mailerConfig = require('../../config/mailer.config');
var userModel=require('../../models/User/UserModel');
var tokenModel=require('../../models/Token/TokenModel');
var passwordHash = require('../../node_modules/password-hash/lib/password-hash');
var jwt = require('../../node_modules/jwt-simple/lib/jwt');
var tokenTypesEnum = require('../../enums/tokenTypes');
var mailerService = require('../../mailer/mailerService');
var commonUtil = require('../../utils/commonUtil');
var successResponse = require('../../models/successResponse');
var errorResponse = require('../../models/errorResponse');
var emailTemplates = require('../../node_modules/email-templates');
var path = require('path');
var templateDir = path.resolve(__dirname, '..', '../templates');
var marshalUser = require('../marshals/marshalUser.service')

var userList;
userList ={
    checkUserEmails : checkUserEmails,
    getUser : getUser,
    createRegisterUser : createRegisterUser,
    confirmRegistration : confirmRegistration,
    checkLogout : checkLogout,
    checkNLogin : checkNLogin,
    forgotPasswordSendLink : forgotPasswordSendLink,
    resetPassword : resetPassword
}

function resetPassword(req,res){
    console.log("updating user state")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var emailId = query.emailId;
    var password = query.password;
    var reg_token = query.token;
    var hashPassword = passwordHash.generate(password);
    console.log("user reg_token  : "+reg_token);
    var tokenType = tokenTypesEnum.OTP.code;
    var updateDate = Date.now();
    userModel.update({email : emailId},{$set :{password : hashPassword,updatedDate : updateDate}}).exec(function(err, response){
        console.log("in users")
        if(err){
            console.log(err);
            var message = "error token is expired cannot recognise any token with your email";
            res.send(new errorResponse('error',message,err));
        }
        else
        {
            console.log("users email received"+response);
            //res1.send(response);
            tokenModel.remove({token : reg_token,email : emailId,type : tokenType}).exec(function(err2,resp2){
                console.log("in remove");
                if(err2){
                    console.log("err2 ---- "+err2);
                    var message = "error token is expired cannot recognise any token with your email";
                    res.send(new errorResponse('error',message,err));
                }
                else{
                    console.log("response22222 ---- "+resp2);
                    var data = resp2;
                    res.send(new successResponse('ok',data,'',"success"));
                    console.log("removed token  ---- ");

                }
            });
        }

    });

}
function forgotPasswordSendLink(req,res){
    console.log("updating forgot state")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var emailId = query.emailId;
    console.log("user reg_token  : "+emailId);
    userModel.findOne({email : emailId}).exec(function(err, response){
        console.log("in users")
        if(err){
            console.log(err);

            var message = "no such mail";
            res.send(new errorResponse('error',message,err));
        }
        else {
            console.log("users email received" + response);
            if (response != undefined) {
                if (response != null) {
                    var tokenType = tokenTypesEnum.OTP.code;
                    var tokenQuery = {
                        email : response.email,
                        type : tokenType
                    };
                    var token = generateToken(tokenQuery);
                    var querToken = {};
                    querToken.email = response.email;
                    querToken.startDate = Date.now();
                    querToken.updatedDate = Date.now();
                    querToken.token = token;
                    querToken.type = tokenType;
                    var tokenObj = tokenModel(querToken);
                    tokenObj.save(function (err) {
                        if (err) {
                            console.log("errorrrr : " + err);
                            var message = "no such mail";
                            res.send(new errorResponse('error',message,err));
                        }
                        else {
                            var mailQuery = {};
                            mailQuery.email = response.email;
                            mailQuery.token = token;
                            mailQuery.subject = 'Reset Password';
                            mailQuery.fullName = response.firstName+" "+response.lastName;
                            mailQuery.url = commonUtil.getServerAddress(req) + "/#/resetPassword/" + token;
                            /*mailQuery.text = 'Hi '+response.firstName+' '+response.lastName+'\nA request has been' +
                             ' received to change the password. Click on below link to set a new password. ' +
                             ''+mailQuery.serverAddress + "/#/resetPassword/" + token // body// body*/
                            mailerService.sendMail('reset_password',mailQuery).then(function(success){
                                    console.log("success");
                                    console.log(success);
                                    var data = response;
                                    res.send(new successResponse('ok',data,'',"success"));
                                },
                                function(data){
                                    console.log("error");
                                    console.log(data);
                                });
                        }
                    });
                }
                else{
                    var message = "No record found for the mail";
                    res.send(new errorResponse('error',message,err));
                }
            }
            else{
                var message = "No record found for the mail";
                res.send(new errorResponse('error',message,err));
            }
        }

    });

}
function getUser(req,res){
    console.log("updating user state")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var reg_token = query.reg_token;
    console.log("user reg_token  : "+reg_token);
    var tokenType = tokenTypesEnum.REGISTRATION.code;
    tokenModel.findOne({token : reg_token}).exec(function(err, response){
        console.log("in users")
        if(err)
        {
            console.log(err);
            res.send(new errorResponse('error',"notfound",err));
        }
        else
        {
            console.log(response+  "users email received"+response);
            if(response != undefined){
                if(response != null){
                    var data = {};
                    data.email = response.email;
                    var status = "ok";
                    var message = "success";
                    res.send(new successResponse('ok',data,'',message));
                }
                else
                {
                    res.send(new errorResponse('error',"notfound",err));
                }

            }
            else{

                var message = "success";
                res.send(new errorResponse('error',"notfound",err));
            }
        }

    })

}
function confirmRegistration(req,res){
    console.log("updating user state")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var reg_token = query.reg_token;
    console.log("user reg_token  : "+reg_token);
    var tokenType = tokenTypesEnum.REGISTRATION.code;
    tokenModel.findOne({token : reg_token}).exec(function(err, response){
        console.log("in users")
        if(err){
            console.log(err);
            var status = "tokenNotfound";
            var message = "no such mail";
            res.send(new errorResponse('error',"tokenNotfound",err));
        }
        else
        {
            if(response != undefined && response != null )
                console.log(response+  "users email received"+response);
            var updateDate = Date.now();
            userModel.update({email : response.email},{$set :{isActive : true,updatedDate : updateDate}}).exec(function(err1, response1){
                console.log("in users")
                if(err1){
                    console.log(err1);

                    var message = "error token is expired cannot recognise any token with your email";
                    res.send(new errorResponse('error',message,err1));
                }
                else
                {
                    console.log("users email received"+response1);
                    //res1.send(response);
                    tokenModel.remove({token : reg_token,email : response.email,type : tokenType}).exec(function(err2,resp2){
                        console.log("in remove");
                        if(err2){
                            console.log("err2 ---- "+err2);
                            var message = "error token is expired cannot recognise any token with your email";
                            res.send(new errorResponse('error',message,err2));
                        }
                        else{
                            console.log("response22222 ---- "+resp2);
                            var data = resp2;
                            var status = "ok";
                            var message = "success";
                            res.send(new successResponse('ok',data,'',message));
                            console.log("removed token  ---- ");

                        }
                    });
                }

            });
            //res.send(response);
        }

    })

}
function createRegisterUser(req,res){
    console.log("in creating user emails")
    //var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

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
        {
            console.log(err);
            res.send(new errorResponse('error',"details are not proper",err));
        }
        else
        {
            console.log("users email received");
            //res.send(response);
            var userLoad = {email : queryTo.email}
            var token = generateToken(userLoad);
            var querToken = {};
            querToken.email = queryTo.email;
            querToken.startDate = Date.now();
            querToken.updatedDate = Date.now();
            querToken.token = token;
            var tokenType = tokenTypesEnum.REGISTRATION.code;
            //var serverAddress = req.protocol + '://' + req.get('host');
            console.log()
            querToken.type = tokenType;
            var tokenObj = tokenModel(querToken);
            tokenObj.save(function(err2){
                if(err2)
                {
                    console.log("errorrrr : "+err2);
                    res.send(new errorResponse('error',"details are not proper",err2));
                }
                else {
                    var mailQuery = {};
                    mailQuery.firstName = userDetails.fname;
                    mailQuery.lastName = userDetails.lname;
                    mailQuery.email = querToken.email;
                    mailQuery.token = token;
                    mailQuery.serverAddress = commonUtil.getServerAddress(req);
                    mailQuery.fullName = mailQuery.firstName+" "+mailQuery.lastName;
                    mailQuery.subject = "confirm registration" // body
                    mailQuery.url = mailQuery.serverAddress+"/#/confirmregistration/"+mailQuery.token // body
                    mailerService.sendMail('confirm_registration',mailQuery).then(function(success){
                            console.log("success");
                            console.log(success);
                            var data = {};
                            var message = "success";
                            res.send(new successResponse('ok',data,'',message));
                        },
                        function(data){
                            console.log("error");
                            console.log(data);
                            res.send(new errorResponse('error',"details are not proper eg: improper email id",data));

                        });


                }

            });
        }

    });


}
function generateToken(queryToken){
    var secret = require('./secret');
    var token = jwt.encode(queryToken,secret());
    console.log("token ------ "+token)
    return token;
}
function checkUserEmails(req,res){
    console.log("checking emails")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var emailId = query.emailId;
    console.log("user email entered : "+emailId);
    userModel.findOne({email : emailId}).exec(function(err, response){
        console.log("in users")
        if(err)
        {
            console.log(err);
            res.send(new errorResponse('error',"details are not proper eg: improper email id",err));

        }
        else
        {
            if(response !=  undefined && response != null){
                console.log("users email received"+response);
                var data = new marshalUser(response);
                var status = "ok";
                var message = "success";
                res.send(new successResponse('ok',data,'',message));
            }
            else{
                res.send(new errorResponse('error',"details are not proper eg: improper email id",err));

            }
        }

    });
}
function checkNLogin(req,res){
    console.log("checking emails")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var emailId = query.emailId;
    var password = query.password;
    console.log("user email entered : "+emailId);
    userModel.findOne({email : emailId,isActive : true}).exec(function(err, response){
        console.log("in users")
        if(err){
            console.log(err);
            var message = "invalid credentials";
            res.send(new errorResponse('error',message,err));
        }
        else
        {
            if(response){
                var comparePswd = verifyPassword(password,response.password);
                console.log("compare result "+comparePswd);
                console.log("users email received"+response);
                if(comparePswd){
                    var tokenObject = new tokenModel();
                    tokenObject.token = generateToken(response.email);
                    tokenObject.email = response.email;
                    tokenObject.type = tokenTypesEnum.AUTHENTICATION.code;
                    tokenObject.startDate = Date.now();
                    tokenObject.updatedDate = Date.now();
                    tokenObject.save(function (err2,resp2) {
                        if(err2){
                            var message = "invalid credentials";
                            res.send(new errorResponse('error',message,err2));
                            console.log("errorrr in token save login "+err2)
                        }
                        else{
                            //email, isActive, authToken, first name, last name
                            var status = "ok";
                            var data = {};
                            //TODO: fix comment: Remove this code and write a method marshalUser, UnMarshalUser in UserUtil js file
                            data.user = marshalUser(response);
                            data.authToken = tokenObject.token;
                            data.tokenId = tokenObject._id;
                            var message = "success";
                            res.send(new successResponse('ok',data,'',message));
                        }
                    });
                }
                else{
                    var message = "invalid credentials";
                    res.send(new errorResponse('error',message,err));
                }
                //res.send(response);
            }
            else{
                var message = "invalid credentials";
                res.send(new errorResponse('error',message,err));
            }
        }

    });
}
function checkLogout(req,res){
    console.log("checking emails")
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    console.log("query "+query);
    var userDetails = query.userDetails;
    var emailId = userDetails.email;
    var authToken = userDetails.authToken;
    console.log("user email entered : "+emailId);
    tokenModel.remove({email : emailId,token : authToken}).exec(function(err,response){
        if(err){
            console.log("errrorrrrrrr in logout  "+err);
            var message = "something Went Wrong";
            res.send(new errorResponse('error',message,err));
        }
        else{
            console.log("token deleted "+response);
            var data = response;
            var status = "ok";
            var message = "success";
            res.send(new successResponse('ok',data,'',message));

        }
    });
}
function verifyPassword(password,dbPassword){
    return passwordHash.verify(password,dbPassword);
}
module.exports = userList;