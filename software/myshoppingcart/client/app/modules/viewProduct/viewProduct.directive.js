/**
 * Created by Lenovo on 1/30/2017.
 */
(function()
{
    angular.module('viewProduct').directive('similarProducts',viewProductDirective);
    function viewProductDirective()
    {
        var directive = {
            scope :{
                similarProductList :'=',
                productType :'@',
                productId : '@'

            },
            templateUrl : 'app/partials/similarProducts.html',
            link : similarProductsFunction,
            controller : similarProductsDirectContoller,
            controllerAs:"sim"
        }
        function  similarProductsFunction(scope,elements,attr)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh "+attr.productType);

        }

        return directive;
    }
    similarProductsDirectContoller.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$stateParams'];

    function similarProductsDirectContoller($scope,cartData,$rootScope,$timeout,$stateParams) {

    }
})();