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
        vm.brandList = [];
        vm.brandList = productsDisplayFactory.getBrands(vm.type);
        console.log(vm.brandList);
        vm.selectedBrands = [];
        //console.log(vm.brandList[0].name+" vm.brandList[0].name")
        vm.selectedBrands.push({"name":vm.brandList[0].name, "ticked" : true});
        vm.selectedBrands.push({"name":vm.brandList[1].name, "ticked" : true});
        vm.productList = [];
        console.log("calling products "+vm.selectedBrands)
        vm.productList = productsDisplayFactory.getProducts(vm.selectedBrands,$rootScope.min,$rootScope.max);
        //console.log(vm.productList)

    }
})();