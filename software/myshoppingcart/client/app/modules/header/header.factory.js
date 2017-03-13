/**
 * Created by SB004 on 3/2/2017.
 */

(function(){
    'use strict'
    angular.module('myApp.header').factory('headerFactory',['$http','$q','api',function($http,$q,api)
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

        //TODO: fix comment: Instead of forming the query parameters inside this factory method, Just pass these as a
        // option to this method from controller
        //Update in all other places
        function resetPassword(emailId,passwd,otp_token){
            var defered = $q.defer();
            var query = {};
            query.emailId = emailId;
            query.password = passwd;
            query.token = otp_token;
            return api.resetPassword({q : query}).$promise;
        }
        function checkEmailSendLinkForgot(emailId){
            var defered = $q.defer();
            var query = {};
            query.emailId = emailId;
            return api.forgotPassword({q : query}).$promise;
        }
        function logoutUserAuthen(userDetails){
            var defered = $q.defer();
            var query = {};
            query.userDetails = userDetails;
            return api.logout({q : query}).$promise;

        }
        function getEmailbyToken(reg_token){
            var defered = $q.defer();
            var query = {};
            query.reg_token = reg_token;


            return api.getUser({q : query}).$promise;

        }
        function confirmRegistration(reg_token){
            var defered = $q.defer();
            var query = {};
            query.reg_token = reg_token;
            return api.confirmRegistration({q : query}).$promise;

        }
        function registerUser(userDetails){
            var defered = $q.defer();
            var query = {};
            query.userDetails = userDetails;
            return api.createUser({q : query}).$promise;
        }
        function getSearchedProducts(valueEntered)
        {
            // simulated async function
            var defered = $q.defer();
            var query = {};
            query.valueEntered = valueEntered;
            return api.searchProducts({q : query}).$promise;
        }
        function checkAllEmail(emailId){
            var defered = $q.defer();
            var query = {};
            query.emailId = emailId;
            return api.checkEmailExist({q : query}).$promise;

        }
        function checkLoginAuthenticate(emailId,password){
            var defered = $q.defer();
            var query = {};
            query.emailId = emailId;
            query.password = password;
            return api.checkNlogin({q : query}).$promise;

        }


    }]);
})();