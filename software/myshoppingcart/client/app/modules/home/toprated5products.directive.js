/**
 * Created by Lenovo on 1/27/2017.
 */
(function () {
    'use strict'
    angular.module('home').directive('topRatedDirective',topRatedProductsDirective);
    function topRatedProductsDirective()
    {
        var directive = {
            scope :{
                productList :'=',
                productType :'@'
            },
            templateUrl : 'app/partials/toprated5products.html',
            link : topLinkFunction,
            controller : homeTopDirectiveController,
            controllerAs : 'top5',
            bindToController: true
        }
        function  topLinkFunction(scope,elements,attr)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh ");

        }

        return directive;
    }
    homeTopDirectiveController.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$state'];

    function homeTopDirectiveController($scope,CartData,$rootScope,$timeout,$state)
    {
        console.log("in top 5 ontroller")
        var vm = this;
        CartData.getJData(vm.productType).then(function(response)
        {
            console.log("in top5directive");
            //console.log(response);
            if(response.status == "ok"){
                vm.productList = [];
                vm.productList = response.data;
                console.log( vm.productList);
            }
            else{
                console.log("no data");
            }

        },function(data)
        {
            //console.log(response);

            //console.log(vm.products);
            return null;
        });
        console.log(vm.productType+" vv vm.productType")
        //vm.productsList = getTopProducts(CartData,vm.productType);
        //console.log(vm.productsList)

    }
    function getTopProducts(CartData,productType){

        //return null;
    }

})();