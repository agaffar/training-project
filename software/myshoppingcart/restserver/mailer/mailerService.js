/**
 * Created by SB004 on 3/14/2017.
 */
var nodemailer = require("nodemailer");
var mailerConfig = require('../config/mailer.config');
var q = require('Q');
var mailerService = {
    sendMail : sendMail
}
function sendMail(queryTo){
        var defered = q.defer();
        console.log("quertoooo maiiller");
        console.log(queryTo);
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",  // sets automatically host, port and connection security settings
            auth: mailerConfig.mailer.auth
        });
        smtpTransport.sendMail({  //email options
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
        });
    return defered.promise;
}
module.exports = mailerService;