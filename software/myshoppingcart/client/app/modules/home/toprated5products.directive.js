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
        }
        function  topLinkFunction(scope,elements,attr)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh ");

        }

        return directive;
    }
    homeTopDirectiveController.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$state'];

    function homeTopDirectiveController($scope,cartData,$rootScope,$timeout,$state)
    {
        console.log($rootScope.products);
    }
})();