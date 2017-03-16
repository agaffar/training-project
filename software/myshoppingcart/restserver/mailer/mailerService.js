/**
 * Created by SB004 on 3/14/2017.
 */
var nodemailer = require("nodemailer");
var mailerConfig = require('../config/mailer.config');
var emailTemplates = require('../node_modules/email-templates');
var path = require('path');
var templateDir = path.resolve(__dirname, '', '../templates');
var q = require('Q');
var mailerService = {
    sendMail : sendMail
}
function sendMail(templateName,queryTo){
        var defered = q.defer();
        console.log("quertoooo maiiller");
        console.log(queryTo);
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",  // sets automatically host, port and connection security settings
            auth: mailerConfig.mailer.auth
        });
    emailTemplates(templateDir, function (err, template) {
        if (err) {
            console.log("outside template function");
            console.log(err);
        }
        // Send a single email
        template(templateName, queryTo, function (err, html, text) {
            if (err) {
                console.log(err);
            }
            else{
                smtpTransport.sendMail({
                    from: mailerConfig.mailer.auth.user,
                    to: queryTo.email,
                    bcc:queryTo.cc,
                    subject: queryTo.subject,
                    html: html,
                    text: text
                }, function(error, respo){  //callback
                    if(error){
                        defered.reject(error);
                        console.log("in mail service")
                        console.log(error);
                    }else{
                        console.log("Message sent: " + respo.message);
                        defered.resolve();
                    }

                    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                });

            }
        });
    });
        /*smtpTransport.sendMail({  //email options
            from: mailerConfig.mailer.auth.user, // sender address.  Must be the same as authenticated user if using Gmail.
            to: queryTo.lastName +"<"+queryTo.email+">", // receiver
            subject: queryTo.subject, // subject
            text: queryTo.text // body
        }, function(error, respo){  //callback
            if(error){
                defered.reject(error);
                console.log(error);
            }else{
                console.log("Message sent: " + respo.message);
                defered.resolve();
            }

            smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        });*/
    return defered.promise;
}
module.exports = mailerService;