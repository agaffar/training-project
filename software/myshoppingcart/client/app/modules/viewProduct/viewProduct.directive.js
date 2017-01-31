/**
 * Created by Lenovo on 1/30/2017.
 */
(function()
{
    angular.module('viewProduct').directive('viewProduct',viewProductDirective);
    function viewProductDirective()
    {
        var directive = {
            scope :{
                productList :'=',
                productType :'@'

            },
            templateUrl : 'app/partials/viewProduct.html',
            link : viewLinkFunction,
            controller : viewProductDirectContoller,
        }
        function  viewLinkFunction(scope,elements,attr)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh ");

        }

        return directive;
    }
    viewProductDirectContoller.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$stateParams'];

    function viewProductDirectContoller($scope,cartData,$rootScope,$timeout,$stateParams)
    {
        console.log($rootScope.products);
    }
})();