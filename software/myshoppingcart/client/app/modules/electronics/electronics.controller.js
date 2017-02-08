/**
 * Created by Lenovo on 1/17/2017.
 */
//Use proper indentation.
//Use the file name similar as controller name.
//Here it file name is electronic-home.controller.js. Do this in all places.
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
        //You can use this code instead of following three lines => var defaultBrands = vm.brandList.slice(0, 2);
        var defaultBrands = [];
        defaultBrands.push(vm.brandList[0]);
        defaultBrands.push(vm.brandList[1]);
        //You can remove line 22.
        vm.productList = [];
        vm.productList = productsDisplayFactory.getProducts(defaultBrands,$rootScope.min,$rootScope.max);
        //console.log(vm.productList)

    }
})();