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
       /* var resultObj = function(){
            CartData.getJData().then(function(response)
            {
                //console.log(response);
                $rootScope.products = [];
                $rootScope.products = response.electronics;
                //vm.products =
                //console.log(vm.products);
            },function(data)
            {
                //console.log(response);


            });
        }
        resultObj();*/
        //console.log(vm.products);
        console.log($rootScope.products);


    }
})();