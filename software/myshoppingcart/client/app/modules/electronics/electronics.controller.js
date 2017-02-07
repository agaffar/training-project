/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('electronics').controller('electronicHomeController',electronic);
    electronic.$inject = ['$http','$rootScope','$stateParams','productsDisplayFactory'];
    function electronic($http,$rootScope,$stateParams,productsDisplayFactory)
    {
        //console.log($rootScope.products);
        var vm = this;
        vm.type = $stateParams.type;
        console.log(vm.type+" type");
        vm.productList = [];
        vm.productList = productsDisplayFactory.getProducts($rootScope.min,$rootScope.max);
        console.log(vm.productList)
        vm.brandList = [];
        vm.brandList = productsDisplayFactory.getBrands(vm.type);
        console.log(vm.brandList);
    }
})();