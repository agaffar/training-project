/**
 * Created by SB004 on 3/9/2017.
 */
(function(){
    'use strict'
    angular.module('user').factory('userFactory',['$http','$q','api',function($http,$q,api)
    {
        var userFactoryServices = { };
        userFactoryServices.getUserData = getUserData;
        userFactoryServices.getUserAddress = getUserAddress;
        userFactoryServices.saveAddress = saveAddress;
        userFactoryServices.deleteAddress = deleteAddress;
        return userFactoryServices;

        function getUserData(query) {
            // simulated async function
            return api.getUserData({q : query}).$promise;
        }

        function getUserAddress(query) {
            // simulated async function
            return api.getUserAddress({q : query}).$promise;
        }

        function saveUserProfile(query) {
            // simulated async function
            return api.saveUserData({q : query}).$promise;
        }
        function saveAddress(query) {
            // simulated async functio
            return api.SaveAddress({q : query}).$promise;
        }

        function deleteAddress(query)
        {
            // simulated async functio
            return api.deleteAddress({q : query}).$promise;
        }
    }]);
})();