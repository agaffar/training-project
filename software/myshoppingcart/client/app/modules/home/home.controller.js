/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    'use strict'
    angular.module('home').controller('homeController',homeController);
    homeController.$inject = ['CartData'];
    function homeController (CartData)
    {
      var vm = this;
        vm.products = [];
        var resultObj = CartData.getJData();

        resultObj.success(function(response)
        {
            //console.log(response);
            vm.products = response.electronics;
            //console.log(vm.products);
        })



    }
})();