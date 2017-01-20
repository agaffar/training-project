/**
 * Created by Lenovo on 1/19/2017.
 */
(function () {
    angular.module('viewProduct').controller('viewProductController',viewCtrl);
    viewCtrl.$inject = ['$stateParams','$rootScope'];
    function viewCtrl($stateParams,$rootScope)
    {
            var vm = this;
            var prodId = $stateParams.id;
        //var ter = vm.message;
        //console.log("stateparam = "+ $stateParams.id);
            for(var i=0;i<$rootScope.products.length;i++)
            {
                var prod = $rootScope.products[i];
                if(prod.id == prodId)
                {
                    vm.product = prod;
                }
            }
        vm.prodName = vm.product.name;
    }
})();