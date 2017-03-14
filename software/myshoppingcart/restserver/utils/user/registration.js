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

//TODO: fix comment: Get rid of this kind of global variables in application

//TODO: fix comment: Modularize this code
//TODO: fix comment: Better if you can write the configuration in external config
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: mailerConfig.mailer.auth
});
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
            var data = {};
            var status = "error token is expired cannot recognise any token with your email";
            var serv = {
                "data" : data,
                "status" : status
            };
            res.send(serv);
        }
        else
        {
            console.log("users email received"+response);
            //res1.send(response);
            tokenModel.remove({token : reg_token,email : emailId,type : tokenType}).exec(function(err2,resp2){
                console.log("in remove");
                if(err2){
                    console.log("err2 ---- "+err2);
                    var data = {};
                    var status = "error token is expired cannot recognise any token with your email";
                    var serv = {
                        "data" : data,
                        "status" : status
                    };
                    res.send(serv);
                }
                else{
                    console.log("response22222 ---- "+resp2);
                    var data = {};
                    var status = "ok";
                    var serv = {
                        "data" : resp2,
                        "status" : status
                    };
                    res.send(serv);
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
    var serverAddress = req.protocol + '://' + req.get('host');

    userModel.findOne({email : emailId}).exec(function(err, response){
        console.log("in users")
        if(err){
            console.log(err);

            var data = {};
            var status = "error";
            var serv = {
                "data" : data,
                "status" : status
            };
            res.send(serv);
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
                    //TODO: fix comment: Do not hart-code the ip address
                    var serverAddress = req.protocol + '://' + req.get('host');
                    querToken.type = tokenType;
                    var tokenObj = tokenModel(querToken);
                    tokenObj.save(function (err) {
                        if (err) {
                            console.log("errorrrr : " + err);
                        }
                        else {
                            //TODO: fix comment: Use email-templates plugin : https://www.npmjs.com/package/email-templates
                            smtpTransport.sendMail({  //email options
                                from: mailerConfig.mailer.auth.user, // sender address.  Must be the same as authenticated user if using Gmail.
                                to: response.lastName + "<" + response.email + ">", // receiver
                                subject: "Reset Password", // subject
                                text: 'Hi '+response.firstName+' '+response.lastName+'\nA request has been received to change the password. Click on below link to set a new password. '+serverAddress + "/#/resetPassword/" + token // body
                            }, function (error, respo) {  //callback
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Message sent: " + respo.message);
                                    var data = {};
                                    var status = "success";
                                    var serv = {
                                        "data" : data,
                                        "status" : status
                                    };
                                    res.send(serv);
                                }

                                smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                            });
                        }
                    });
                }
                else{
                    var data = {};
                    var status = "EmailNotFound";
                    var serv = {
                        "data" : data,
                        "status" : status
                    };
                    res.send(serv);
                }
            }
            else{
                var data = {};
                var status = "EmailNotFound";
                var serv = {
                    "data" : data,
                    "status" : status
                };
                res.send(serv);
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
            console.log(err);
        else
        {
            console.log(response+  "users email received"+response);
            if(response != undefined){
                if(response != null){
                    var data = {};
                    data.email = response.email;
                    var status = "ok";
                    var serv = {
                        "data" : data,
                        "status" : status
                    };
                    res.send(serv);
                }
                else
                {
                    var data = {};
                    var status = "notfound";
                    var serv = {
                        "data" : data,
                        "status" : status
                    };

                    res.send(serv);
                }

            }
            else{
                var data = {};
                var status = "notfound";
                var serv = {
                    "data" : data,
                    "status" : status
                };

                res.send(serv);
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
            var data = {};
            var status = "tokenNotfound";
            var serv = {
                "data" : data,
                "status" : status
            };
            res.send(serv);
        }
        else
        {
            if(response != null || response )
            console.log(response+  "users email received"+response);
            var updateDate = Date.now();
            userModel.update({email : response.email},{$set :{isActive : true,updatedDate : updateDate}}).exec(function(err1, response1){
                console.log("in users")
                if(err1){
                    console.log(err1);
                    var data = {};
                    var status = "error token is expired cannot recognise any token with your email";
                    var serv = {
                        "data" : data,
                        "status" : status
                    };
                    res.send(serv);
                }
                else
                {
                    console.log("users email received"+response1);
                    //res1.send(response);
                    tokenModel.remove({token : reg_token,email : response.email,type : tokenType}).exec(function(err2,resp2){
                        console.log("in remove");
                        if(err2){
                            console.log("err2 ---- "+err2);

                            var data = {};
                            var status = "error token is expired cannot recognise any token with your email";
                            var serv = {
                                "data" : data,
                                "status" : status
                            };
                            res.send(serv);
                        }
                        else{
                            console.log("response22222 ---- "+resp2);
                            var data = {};
                            var status = "ok";
                            var serv = {
                                "data" : resp2,
                                "status" : status
                            };
                            res.send(serv);
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
            console.log(err);
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
            tokenObj.save(function(err){
                if(err)
                {
                    console.log("errorrrr : "+err);
                }
                else {
                    //console.log("created "+i);
                    /* sendmail(
                     {
                     user: 'abdulgaffar09@gmail.com',
                     pass: 'bismillah@213',
                     from: 'abdulgaffar09@gmail.com',
                     to: querToken.email,
                     subject: 'confirm your registration',
                     html: serverAddress+"/#/confirmregistration/"+token,
                     }, function(err, reply) {
                     console.log(err && err.stack);
                     //console.dir(reply);
                     });*/
                    var mailQuery = {};
                    mailQuery.firstName = userDetails.fname;
                    mailQuery.lastName = userDetails.lname;
                    mailQuery.email = querToken.email;
                    mailQuery.token = token;
                    mailQuery.serverAddress = commonUtil.getServerAddress(req);
                    mailerService.sendMail(mailQuery).then(function(success){
                        console.log("success");
                        console.log(success);
                    },
                    function(data){
                        console.log("error");
                        console.log(data);
                    });
                   /* smtpTransport.sendMail({  //email options
                     from: mailerConfig.mailer.auth.user, // sender address.  Must be the same as authenticated user if using Gmail.
                     to: queryTo.lastName +"<"+querToken.email+">", // receiver
                     subject: "confirm your registration", // subject
                     text: serverAddress+"/#/confirmregistration/"+token // body
                     }, function(error, respo){  //callback
                     if(error){
                     console.log(error);
                     }else{
                     console.log("Message sent: " + respo.message);


                     }

                     smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                     });*/
                    var data = {};
                    var status = "ok";
                    var serv = {
                        "data" : data,
                        "status" : status
                    };
                    res.send(serv);

                }

            });
        }

    });
    /*console.log("token genration ")
    var userLoad = {email : queryTo.email}
    var secret = require('./secret');
    var token = jwt.encode(userLoad,secret());
    console.log("token ------ "+token)*/


}
function generateToken(queryToken){

    //var userLoad = {email : emailId}
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
    userModel.find({email : emailId}).exec(function(err, response){
        console.log("in users")
        if(err)
            console.log(err);
        else
        {
            console.log("users email received"+response.length);
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
            var data = {};
            var status = "invalid credentials";
            var serv = {
                "data" : data,
                "status" : status
            };
            res.send(serv);
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
                            var data = {};
                            var status = "invalid credentials";
                            var serv = {
                                "data" : resp2,
                                "status" : status
                            };
                            res.send(serv);
                            console.log("errorrr in token save login "+err2)
                        }
                        else{
                            //email, isActive, authToken, first name, last name
                            var status = "ok";
                            var data = {};
                            //TODO: fix comment: Remove this code and write a method marshalUser, UnMarshalUser in UserUtil js file
                            data.email = response.email;
                            data.isActive = response.isActive;
                            data.firstName = response.firstName;
                            data.lastName = response.lastName;
                            data.authToken = tokenObject.token;
                            data.tokenId = tokenObject._id;
                            data.userId = response._id;
                            var serResponse = {};
                            serResponse.status = status;
                            serResponse.data = data;
                            console.log("resss "+resp2);
                            res.send(serResponse);
                        }
                    });
                }
                else{
                    var servRes = {};
                    servRes.status = "err";
                    res.send(servRes);
                }
                //res.send(response);
            }
            else{
                var servRes = {};
                servRes.status = "err";
                res.send(servRes);
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
       }
       else{
           console.log("token deleted "+response);
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
function verifyPassword(password,dbPassword){
return passwordHash.verify(password,dbPassword);
}
module.exports = userList;