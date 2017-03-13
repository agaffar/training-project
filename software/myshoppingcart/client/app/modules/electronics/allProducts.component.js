/**
 * Created by Lenovo on 2/2/2017.
 */
//File name should be similar to component name. So the file name should be display-all-products.component.js
(function(){
    angular.module('electronics').component('displayAllProducts',{
        bindings:{
            productList :'=',
            productType:'@'

        },
        templateUrl:"app/partials/allProducts.html",
        controller: displayAllProdsController,
        controllerAs:"allProds"
    })
    displayAllProdsController.$inject=['$scope','$timeout'];
    function displayAllProdsController($scope,$timeout)
    {

        console.log("in search controller component"+$scope.productType);
    }


})();