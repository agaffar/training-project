/**
 * Created by Lenovo on 1/18/2017.
 */
(function(){
 'use strict'
 angular.module('home').factory('CartData',['$http','$q',function($http,$q)
 {
  var factoryServices = { };
  factoryServices.getJData = getDetails;
  return factoryServices;

  function getDetails()
  {
   //console.log("in details");
  /* return $http.get('dataset.json');*/

    // simulated async function
    var defered = $q.defer();
    $http.get('dataset.json').success(function (response)
    {
     //defered = response.data;
     defered.resolve(response);
     console.log(defered.promise);
    }).error(function (response){
       defered.reject("failed to load json");
    })


    return defered.promise;
   }



 }]);
})();