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

        function resetPassword(query){
            return api.resetPassword({q : query}).$promise;
        }
        function checkEmailSendLinkForgot(query){
            console.log(query.emailId)
            return api.forgotPassword({q : query}).$promise;
        }
        function logoutUserAuthen(query){
            return api.logout({q : query}).$promise;
        }
        function getEmailbyToken(query){
            return api.getUser({q : query}).$promise;
        }
        function confirmRegistration(query){
            return api.confirmRegistration({q : query}).$promise;

        }
        function registerUser(query){
            return api.createUser({q : query}).$promise;
        }
        function getSearchedProducts(query)
        {
            return api.searchProducts({q : query}).$promise;
        }
        function checkAllEmail(query){
            return api.checkEmailExist({q : query}).$promise;
        }
        function checkLoginAuthenticate(query){
            return api.checkNlogin({q : query}).$promise;
        }


    }]);
})();