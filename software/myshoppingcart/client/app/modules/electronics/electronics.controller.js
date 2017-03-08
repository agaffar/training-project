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
        //vm.brandList = productsDisplayFactory.getBrands(vm.type);
        productsDisplayFactory.getBrands(vm.type).then(function(response)
        {
            console.log("in get brands");
            //console.log(response);

            if(response.status == "ok"){
                vm.brandList = response.data;
                console.log( vm.brandList);
            }
            else{
                console.log( "no data retrived");
            }
            vm.brandList = productsDisplayFactory.removeDuplicates(vm.brandList);
        },function(data)
        {
            return null;
        });
    /*    console.log(vm.brandList);*/
        console.log('selectedBrands init');
        vm.selectedBrands = [];
        vm.allOffers = productsDisplayFactory.getOffers(vm.type);

     /*   //console.log(vm.brandList[0].name+" vm.brandList[0].name")
       /!* vm.brandList[0].ticked = true;
        vm.brandList[1].ticked = true;
        vm.selectedBrands = (vm.brandList.slice(0,2));*!/
        //vm.allOffers = productsDisplayFactory.getOffers(vm.type);
        productsDisplayFactory.getOffers(vm.type).then(function(response)
        {
            console.log("in get offers");
            //console.log(response);

            vm.allOffers  = response;
            console.log( vm.allOffers);
        },function(data)
        {
            console.log("errr")
            return null;
        });*/
        console.log("offers are ");
        console.log(vm.allOffers);
        vm.productList = [];
        //console.log("calling products "+vm.selectedBrands[0].name)
        console.log(vm.selectedBrands)
        var offersSelected = [];
        productsDisplayFactory.getProducts(vm.type,offersSelected,vm.selectedBrands,$rootScope.min,$rootScope.max).then(function(response)
        {
            if(response.status == "ok"){
                vm.productList = response.data;
                console.log( vm.productList);
            }
            else{
                console.log( "no data retrived");
            }
        /*    vm.brandList  = productsDisplayFactory.getBrands(vm.productList);
            vm.allOffers = productsDisplayFactory.getOffers(vm.productList);*/

        },function(data)
        {
            return null;
        });



    }
})();