/**
 * Created by Lenovo on 2/2/2017.
 */
//Don't use the filter, directive, component etc.. as component names in angular js.
// Because angularjs already using them. It may create the conflict.
(function(){
    angular.module('electronics').component('filter',{
        bindings : {
            value:'@',
            productList : '=',
            brandList : '=',
            onKeyUp : '&'
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
        vm.searchByBrand = searchByBrand;
        //You can use single method instead of two methods below.
        vm.selectedAll = checkAllSelected
        vm.selectedNone = checkNoneSelected
        vm.selectedBrands = [];
        vm.selectedBrands.push(vm.brandList[0]);
        vm.selectedBrands.push(vm.brandList[1]);

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
                        console.log('on change ' + vm.selectedBrands); // logs 'on change slider-id'
                        //You can remove line 44.
                        vm.productList = [];
                        vm.productList = productsDisplayFactory.getProducts(vm.selectedBrands, vm.slider.min, vm.slider.max);
                        console.log( vm.productList); // logs 'on change slider-id'
                    },
                }
            };
        }
        /*console.log("filter component controller brandlist "+vm.brandList);
         console.log("object values = "+Object.values(vm.brandList))*/
        setPriceSlider();
        console.log(vm.selectedBrands);
        function searchByBrand(input)
        {
            console.log(vm.selectedBrands);
            vm.productList = productsDisplayFactory.getProducts(vm.selectedBrands, vm.slider.min, vm.slider.max);

        }
        function checkAllSelected()
        {
            if(vm.selectedBrands.length == vm.brandList.length)
            {
                console.log("all selected");
                vm.productList = $rootScope.products;
            }

        }
        function checkNoneSelected()
        {
            if(vm.selectedBrands.length  == 0)
            {
                console.log("none selected");
                vm.productList = $rootScope.products;
            }

        }
    }
})();
