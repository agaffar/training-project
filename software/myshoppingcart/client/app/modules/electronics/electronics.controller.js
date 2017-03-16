/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('electronics').controller('electronicHomeController',electronic);
    electronic.$inject = ['$http','$rootScope','$stateParams','productsDisplayFactory'];
    function electronic($http,$rootScope,$stateParams,productsDisplayFactory)
    {

        var vm = this;
        vm.type = $stateParams.type;

        vm.brandList = [];
        $rootScope.min = 3000;
        $rootScope.max = 30000;
        productsDisplayFactory.getBrands(vm.type).then(function(response)
        {
            console.log("in get brands");


            if(response.status == "ok"){
                vm.brandList = response.data;
            }
            else{
                console.log( "no data retrived");
            }
            vm.brandList = productsDisplayFactory.removeDuplicates(vm.brandList);
        },function(data)
        {
            return null;
        });

        vm.selectedBrands = [];
        vm.allOffers = productsDisplayFactory.getOffers(vm.type);


        vm.productList = [];
        var offersSelected = [];
        productsDisplayFactory.getProducts(vm.type,offersSelected,vm.selectedBrands,$rootScope.min,$rootScope.max).then(function(response)
        {
            if(response.status == "ok"){
                vm.productList = response.data;
                console.log(vm.productList);
            }
            else{
                console.log( "no data retrived");
            }

        },function(data)
        {
            return null;
        });



    }
})();