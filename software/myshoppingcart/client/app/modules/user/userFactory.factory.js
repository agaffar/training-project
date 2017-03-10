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

        function getUserData(userId)
        {
            // simulated async function
            var defered = $q.defer();
            console.log("type home factory = "+userId);
            var query = {};
            query.userId = userId;
            console.log("sending requesting to server");
            console.log(typeof query);
            return api.getUserData({q : query}).$promise;
        }
        function getUserAddress(userId)
        {
            // simulated async function
            var defered = $q.defer();
            console.log("type home factory = "+userId);
            var query = {};
            query.userId = userId;
            console.log("sending requesting to server");
            console.log(typeof query);
            return api.getUserAddress({q : query}).$promise;
        }
        function saveAddress(Address,userId)
        {
            // simulated async function
            var defered = $q.defer();
            console.log("type user factory = "+userId);
            console.log("type home factory = "+Address);
            var query = {};
            query.userId = userId;
            query.Address = Address;
            console.log("sending requesting to server");
            console.log(typeof query);
            return api.SaveAddress({q : query}).$promise;
        }
        function deleteAddress(userId,Address)
        {
            // simulated async function
            var defered = $q.defer();
            console.log("type user factory = "+userId);
            console.log("type home factory = "+Address);
            var query = {};
            query.userId = userId;
            query.Address = Address;
            console.log("sending requesting to server");
            console.log(typeof query);
            return api.deleteAddress({q : query}).$promise;
        }



    }]);
})();