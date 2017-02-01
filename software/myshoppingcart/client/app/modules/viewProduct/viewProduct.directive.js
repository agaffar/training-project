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
            controller : similarProductsDirectController,
            controllerAs:"sim"
        }
        function  similarProductsFunction(scope,elements,attr)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh "+attr.productType);

        }

        return directive;
    }
    similarProductsDirectController.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$stateParams'];

    function similarProductsDirectController($scope,cartData,$rootScope,$timeout,$stateParams) {

    }
})();