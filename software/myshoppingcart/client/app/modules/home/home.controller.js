/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    'use strict'
    angular.module('home').controller('homeController',homeController);
    homeController.$inject = ['CartData','$rootScope'];
    function homeController (CartData,$rootScope)
    {
      var vm = this;
       console.log(vm.message+" mesage");
    }

})();