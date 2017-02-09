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
        console.log('selectedBrands init');
        vm.selectedBrands = [];
        //console.log(vm.brandList[0].name+" vm.brandList[0].name")
       /* vm.brandList[0].ticked = true;
        vm.brandList[1].ticked = true;
        vm.selectedBrands = (vm.brandList.slice(0,2));*/
        vm.allOffers = productsDisplayFactory.getOffers(vm.type);
        console.log("offers are ");
        console.log(vm.allOffers);
        vm.productList = [];
        //console.log("calling products "+vm.selectedBrands[0].name)
        console.log(vm.selectedBrands)
        var offersSelected = [];
        vm.productList = productsDisplayFactory.getProducts(offersSelected,vm.selectedBrands,$rootScope.min,$rootScope.max);


    }
})();