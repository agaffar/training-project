/**
 * Created by Lenovo on 2/6/2017.
 */

(function(){
    angular.module('books').controller('booksController',bookController);
    bookController.$inject = ['$http','$rootScope','$stateParams','productsDisplayFactory'];
    function bookController($http,$rootScope,$stateParams,productsDisplayFactory)
    {
        //console.log($rootScope.products);
        var vm = this;
        vm.type = $stateParams.type;
        console.log(vm.type+" type");
        vm.productList = [];
        vm.productList = productsDisplayFactory.getProducts($rootScope.min,$rootScope.max);
        console.log(vm.productList)
    }
})();