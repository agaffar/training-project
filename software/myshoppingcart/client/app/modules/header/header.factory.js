/**
 * Created by SB004 on 3/2/2017.
 */

(function(){
    'use strict'
    angular.module('myApp.header').factory('headerFactory',['$http','$q',function($http,$q)
    {
        var headfactoryServices = { };
        headfactoryServices.getSearched = getSearchedProducts;
        return headfactoryServices;

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



    }]);
})();