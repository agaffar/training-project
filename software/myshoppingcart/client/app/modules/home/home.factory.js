/**
 * Created by Lenovo on 1/18/2017.
 */
(function(){
 'use strict'
 angular.module('home').factory('CartData',['$http','$q',function($http,$q)
 {
  var homefactoryServices = { };
   homefactoryServices.getJData = getDetails;
  return homefactoryServices;

     function getDetails(type)
     {
         //console.log("in details");
         /* return $http.get('dataset.json');*/

         // simulated async function
         var defered = $q.defer();
         console.log("type home factory = "+type);
         var query = {};
         query.type = type;
         console.log("sending requesting to server");
        console.log(typeof query);
         $http.get('/api/products/?q='+JSON.stringify(query)).success(function (response)
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