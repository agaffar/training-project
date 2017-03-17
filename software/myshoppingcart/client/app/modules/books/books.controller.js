/**
 * Created by Lenovo on 2/6/2017.
 */

(function(){
    //Both names should be same controller('booksController',bookController)
    angular.module('books').controller('booksController',bookController);
    bookController.$inject = ['$http','$rootScope','$stateParams','productsDisplayFactory'];
    function bookController($http,$rootScope,$stateParams,productsDisplayFactory)
    {
        //console.log($rootScope.products);
        var vm = this;
        vm.type = $stateParams.type;
        console.log(vm.type+" in books type");
        vm.brandList = [];
        //vm.brandList = productsDisplayFactory.getBrands(vm.type);
        var query = {};
        query.type = vm.type;
        productsDisplayFactory.getBrands(query).then(function(response)
        {

            if(response.status == "ok"){
                vm.brandList = response.data;
            }
            else{

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
        $rootScope.min = 60;
        $rootScope.max = 10000;
        var query = {};
        query.type = vm.type;
        var offersNamesArray = productsDisplayFactory.getNamesOfferSelected(offersSelected);
        var brandsNamesArray = productsDisplayFactory.getNamesBrands(vm.selectedBrands);

        query.offersSelected = offersNamesArray;
        query.brandsSelected = brandsNamesArray;
        query.min = $rootScope.min;
        query.max = $rootScope.max;
        productsDisplayFactory.getProducts(query).then(function(response)
        {
            if(response.status == "ok"){
                vm.productList = response.data;

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