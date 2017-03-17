
/**
 * Created by zia on 3/3/2017.
 */
(function(){
    'use strict'
    angular.module('viewProduct').factory('viewProductFactory',['$http','$q','api',function($http,$q,api)
    {
        var homefactoryServices = { };
        homefactoryServices.getProduct = getProductDetails;
        homefactoryServices.getSimilarProducts = getSimilarProducts;
        return homefactoryServices;

        function getProductDetails(query){
            return api.getProduct({q:query}).$promise;
        }
        function getSimilarProducts(query){
            return api.getSimilarProducts({q : query}).$promise;
        }
    }]);
})();