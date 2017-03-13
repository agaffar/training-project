
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

        function getProductDetails(productId)
        {

            // simulated async function
            var defered = $q.defer();
            var query = {};
            query.productId = productId;

            return api.getProduct({q:query}).$promise;
        }
        function getSimilarProducts(prodId,subType){
            var defered = $q.defer();
            var query = {};
            query.prodId = prodId;
            query.subType = subType;


            return api.getSimilarProducts({q : query}).$promise;
        }



    }]);
})();