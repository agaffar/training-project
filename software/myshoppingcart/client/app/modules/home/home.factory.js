/**
 * Created by Lenovo on 1/18/2017.
 */
(function(){
 'use strict'
 angular.module('home').factory('CartData',['$http',function($http)
 {
  var factoryServices = {};
  factoryServices.getJData = getDetails;




  function getDetails()
  {
   //console.log("in details");
   return $http.get('dataset.json');
  }
  return factoryServices;
 }]);
})();