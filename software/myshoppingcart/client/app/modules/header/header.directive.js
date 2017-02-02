/**
 * Created by Lenovo on 1/25/2017.
 */
(function(){
    angular.module('myApp.header').directive('myHeader',headerDirective);
    function headerDirective()
    {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/partials/header.html',
            link : linkFunction,
            controller : headDirectiveController,
            controllerAs : "headc",
            bindToController: true
        }
        function  linkFunction(scope,elements,attr)
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh ");

        }

        return directive;
    }
    headDirectiveController.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$state'];
    function headDirectiveController($scope, CartData,$rootScope, $timeout,$state)
    {
        console.log("conteoller directive"+$rootScope.products);
        var vm = this;
        vm.viewProduct = viewSelectedProduct;
        vm.message = "hello directive";
        console.log(vm.message);
        vm.refreshed = [];
        vm.refreshProds = refreshProductList;
        console.log("dddd");
        function refreshProductList(valueEntered)
        {
            var refreshed = [];
            console.log("entered fun");
            //$scope.$apply(function() {
            //console.log($rootScope.products);
            if(valueEntered.length>2)
            {
                var regex = new RegExp(valueEntered,"ig");
                for(var i=0;i<$rootScope.products.length;i++)
                {
                    var product = $rootScope.products[i];
                    //console.log(valueEntered+"  regex= "+regex);

                    if(product. name.toString().match(regex))
                    {
                        //console.log("for entered"+valueEntered+" ,"+product.name+" has "+regex+" = "+product.name.toString().match(regex));
                        refreshed.push(product);
                    }
                }
                if(refreshed.length ) {

                    vm.refreshed = refreshed;
                    console.log(vm.refreshed.length + "  length");
                }
            } else {
                vm.refreshed = [];
            }
            //});
        }
        function viewSelectedProduct(productid)
        {

            console.log("state go = "+productid);
            $state.go("product",{id:productid});
        }
    }
})();