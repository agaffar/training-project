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
    displayAllProdsController.$inject=['$scope','$timeout'];
    function displayAllProdsController($scope,$timeout)
    {
        $timeout(function () {
            $scope.$watch("productList",
                function(newValue, oldValue) {
                    console.log(oldValue+" oldvalue   new value = "+newValue)
                },true);
        }, 2000);

        console.log("in search controller component"+$scope.productType);
    }


})();