/**
 * Created by Lenovo on 2/1/2017.
 */
(function(){
    angular.module('viewProduct').component('productDetails',{
        bindings :{
            product : '='
        },
        templateUrl :'app/partials/productDetails.html',
        controller : prodDetailsControl,
        controllerAs : 'pdc'
    });
    prodDetailsControl.$inject = ['$scope'];
    function prodDetailsControl($scope)
    {

    }
})();