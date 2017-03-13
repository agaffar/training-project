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

        function getUserData(userId) {
            // simulated async function
            var defered = $q.defer();

            var query = {};
            query.userId = userId;

            return api.getUserData({q : query}).$promise;
        }

        function getUserAddress(query) {
            // simulated async function

            return api.getUserAddress({q : query}).$promise;
        }

        function saveAddress(Address,userId) {
            // simulated async function
            var defered = $q.defer();

            var query = {};
            query.userId = userId;
            query.Address = Address;

            return api.SaveAddress({q : query}).$promise;
        }

        function deleteAddress(userId,Address)
        {
            // simulated async function
            var defered = $q.defer();

            var query = {};
            query.userId = userId;
            query.Address = Address;

            return api.deleteAddress({q : query}).$promise;
        }



    }]);
})();