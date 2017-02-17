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
       /* //Why we need $timeout here. Try to avoid using &timeout. It's very dangerous
        $timeout(function () {
            //Is this watch working? Use "allProds.productList" inside watch.
            $scope.$watch("productList",
                function(newValue, oldValue) {
                    console.log(oldValue+" oldvalue   new value = "+newValue)
                },true);
        }, 2000);*/

        console.log("in search controller component"+$scope.productType);
    }


})();