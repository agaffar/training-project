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

        }

        return directive;
    }
    homeTopDirectiveController.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$state'];

    function homeTopDirectiveController($scope,CartData,$rootScope,$timeout,$state)
    {
        var vm = this;
        var query = {};
        query.type = vm.productType;
        CartData.getJData(query).then(function(response)
        {
            if(response.status == "ok"){
                vm.productList = [];
                vm.productList = response.data;
            }
            else{
                console.log("no data");
            }

        },function(data)
        {
            return null;
        });
    }

})();