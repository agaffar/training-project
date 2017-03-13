/**
 * Created by Lenovo on 1/18/2017.
 */
(function(){
 'use strict'
 angular.module('home').factory('CartData',['$http','$q','api',function($http,$q,api)
 {
  var homefactoryServices = { };
   homefactoryServices.getJData = getDetails;
  return homefactoryServices;

     function getDetails(type)
     {
         // simulated async function
         var defered = $q.defer();
         var query = {};
         query.type = type;

         return api.topRatedProducts({q : query}).$promise;
     }



 }]);
})();