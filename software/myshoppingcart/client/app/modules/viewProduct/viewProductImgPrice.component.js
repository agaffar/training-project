/**
 * Created by Lenovo on 2/1/2017.
 */
(function(){
    angular.module('viewProduct').component('productImagePrice',{
        bindings :{
            product : '=',
            picPath :'@'
        },
        templateUrl :'app/partials/productImagePrice.html',
        controller : viewProdImpController,
        controllerAs : 'pip'
    });
    viewProdImpController.$inject = [];
    function viewProdImpController(){
        var vm = this;
    }
})();