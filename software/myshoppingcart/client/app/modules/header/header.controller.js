/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp.header').controller('headController',headCont);
    headCont.$inject = ['$scope','headerFactory', 'CartData','$rootScope', '$timeout','$state'];
    function headCont ( $scope,headerFactory, CartData,$rootScope, $timeout,$state)
    {
        var vm = this;
        vm.refreshed = [];
        //TODO: fix comment: Remove unused methods
        vm.refreshProds = refreshProductList;
        vm.viewProduct = viewSelectedProduct;

        function checkAvailability(emailId){
            console.log("checkEmail id = "+emailId);
        }
    }
})();