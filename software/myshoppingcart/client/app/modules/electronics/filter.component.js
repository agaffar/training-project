/**
 * Created by Lenovo on 2/2/2017.
 */
(function(){
    angular.module('electronics').component('filter',{
        bindings : {
            value:'@',
            productList : '='
        },
        templateUrl : 'app/partials/filter.html',
        controller : filterController,
        controllerAs : 'fltr'
    });
    filterController.$inject = ['$scope','$rootScope','productsDisplayFactory'];
    function filterController($scope,$rootScope,productsDisplayFactory)
    {
        var setPriceSlider = setPriceSlider;
        var vm = this;
        function setPriceSlider()
        {
            vm.slider = {
                min: $rootScope.min,
                max: $rootScope.max,
                options: {
                    floor: 0,
                    ceil: 100000,
                    translate: function(value) {
                        return '&#8377;' + value;
                    },
                    onChange: function() {
                        vm.productList = [];
                        vm.productList = productsDisplayFactory.getProducts( vm.slider.min, vm.slider.max);
                        console.log('on change ' + vm.productList); // logs 'on change slider-id'
                    },
                }
            };
        }

        setPriceSlider();
    }
})();