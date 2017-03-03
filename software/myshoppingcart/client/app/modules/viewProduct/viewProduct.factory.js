
/**
 * Created by zia on 3/3/2017.
 */
/**
 * Created by Lenovo on 1/18/2017.
 */
(function(){
    'use strict'
    angular.module('viewProduct').factory('viewProductFactory',['$http','$q',function($http,$q)
    {
        var homefactoryServices = { };
        homefactoryServices.getProduct = getProductDetails;
        homefactoryServices.getSimilarProducts = getSimilarProducts;
        return homefactoryServices;

        function getProductDetails(productId)
        {
            //console.log("in details");
            /* return $http.get('dataset.json');*/

            // simulated async function
            var defered = $q.defer();
            console.log("id product view factory = "+productId);
            var query = {};
            query.productId = productId;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/api/products/viewproduct/?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json");
            })


            return defered.promise;
        }
        function getSimilarProducts(prodId,subType){
            var defered = $q.defer();
            console.log(subType+ "id product view factory = "+prodId);
            var query = {};
            query.prodId = prodId;
            query.subType = subType;

            console.log("sending requesting to server");
            console.log(query);
            console.log(JSON.stringify(query));
            $http.get('/api/products/viewproduct/similarProducts/?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                console.log("response in similar");

                defered.resolve(response);
                console.log("response in similar");
                console.log(response);
            }).error(function (response){
                console.log("response in err");

                console.log(response)
                defered.reject("failed to load json");
            })
            return defered.promise;
        }



    }]);
})();