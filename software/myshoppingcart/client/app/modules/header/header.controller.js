/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp.header').controller('headController',headCont);
    headCont.$inject = ['$scope', 'CartData','$rootScope', '$timeout','$state'];
    function headCont ( $scope, CartData,$rootScope, $timeout,$state)
    {
        var vm = this;
        vm.refreshed = [];
        vm.refreshProds = refreshProductList;
        vm.viewProduct = viewSelectedProduct;

        $scope.$watch("headc.refreshed", function(oldV, newV){
            console.log("coming in list change");
        },true);
        function refreshProductList(valueEntered)
        {
            var refreshed = [];
            console.log("entered fun");
            //$scope.$apply(function() {
                if(valueEntered.length>2)
                {
                    var regex = new RegExp(valueEntered,"ig");
                    for(var i=0;i<$rootScope.products.length;i++)
                    {
                        var product = $rootScope.products[i];
                        //console.log(valueEntered+"  regex= "+regex);

                        if(product.name.toString().match(regex))
                        {
                            //console.log("for entered"+valueEntered+" ,"+product.name+" has "+regex+" = "+product.name.toString().match(regex));
                            refreshed.push(product);
                        }
                    }
                    if(refreshed.length ) {
                        $timeout(function() {
                            vm.refreshed = refreshed;
                            console.log(vm.refreshed.length + "  length");
                        });
                    }
                    $scope.$apply();

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