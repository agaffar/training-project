/**
 * Created by Lenovo on 2/2/2017.
 */
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
    displayAllProdsController.$inject=['$scope'];
    function displayAllProdsController($scope)
    {
        console.log("in search controller component"+$scope.productType);
    }


})();