/**
 * Created by SB004 on 3/2/2017.
 */

(function(){
    'use strict'
    angular.module('myApp.header').factory('headerFactory',['$http','$q',function($http,$q)
    {
        var headfactoryServices = { };
        headfactoryServices.getSearched = getSearchedProducts;
        headfactoryServices.checkEmail = checkAllEmail;
        headfactoryServices.registerUser = registerUser;
        headfactoryServices.confirmRegistration = confirmRegistration;
        headfactoryServices.checkLoginAuthenticate = checkLoginAuthenticate;
        headfactoryServices.checkEmailSendLinkForgot = checkEmailSendLinkForgot;
        headfactoryServices.logoutUser = logoutUserAuthen;
        headfactoryServices.getEmailbyToken = getEmailbyToken;
        headfactoryServices.resetPassword = resetPassword;
        return headfactoryServices;

        function resetPassword(emailId,passwd,otp_token){
            var defered = $q.defer();
            console.log("type header factory = "+emailId);
            var query = {};
            query.emailId = emailId;
            query.password = passwd;
            query.token = otp_token;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/users/resetpassword?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function checkEmailSendLinkForgot(emailId){
            var defered = $q.defer();
            console.log("type header factory = "+emailId);
            var query = {};
            query.emailId = emailId;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/users/forgotPassword?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function logoutUserAuthen(userDetails){
            var defered = $q.defer();
            console.log("type header factory = "+userDetails);
            var query = {};
            query.userDetails = userDetails;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.delete('/users/logout?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function getEmailbyToken(reg_token){
            var defered = $q.defer();
            console.log("type header factory = "+reg_token);
            var query = {};
            query.reg_token = reg_token;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/users/getUser?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function confirmRegistration(reg_token){
            var defered = $q.defer();
            console.log("type header factory = "+reg_token);
            var query = {};
            query.reg_token = reg_token;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.post('/users/register/confirmregistration?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function registerUser(userDetails){
            var defered = $q.defer();
            console.log("type header factory = "+userDetails);
            var query = {};
            query.userDetails = userDetails;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.post('/users/register/createUser?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function getSearchedProducts(valueEntered)
        {
            //console.log("in details");
            /* return $http.get('dataset.json');*/

            // simulated async function
            var defered = $q.defer();
            console.log("type header factory = "+valueEntered);
            var query = {};
            query.valueEntered = valueEntered;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/api/products/search?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json");
            })
            return defered.promise;
        }
        function checkAllEmail(emailId){
            var defered = $q.defer();
            console.log("type header factory = "+emailId);
            var query = {};
            query.emailId = emailId;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/users/register/checkemail?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }
        function checkLoginAuthenticate(emailId,password){
            var defered = $q.defer();
            console.log(password+"type header factory = "+emailId);
            var query = {};
            query.emailId = emailId;
            query.password = password;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/users/login/?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json")
                console.log("in header factory error");

            })
            return defered.promise;
        }


    }]);
})();