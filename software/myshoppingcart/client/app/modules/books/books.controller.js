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
        productsDisplayFactory.getBrands(vm.type).then(function(response)
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
        productsDisplayFactory.getProducts(vm.type,offersSelected,vm.selectedBrands,$rootScope.min,$rootScope.max).then(function(response)
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