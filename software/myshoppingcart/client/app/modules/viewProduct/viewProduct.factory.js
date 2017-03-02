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



    }]);
})();