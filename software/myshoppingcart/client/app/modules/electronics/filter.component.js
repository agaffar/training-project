/**
 * Created by Lenovo on 2/2/2017.
 */
(function(){
    angular.module('electronics').component('filter',{
        bindings : {
            value:'@',
            productList : '=',
            brandList : '=',
            selectedBrandList : '=',
            offersList : '=',

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
        vm.selectedAll = checkAllSelected;
        vm.selectedNone = checkNoneSelected;
        vm.checkBrands = checkBrandsSelected;
        var getSelectedBrands = getSelectedBrands;
        vm.checkOfferSelected = checkOfferSelected;
        var getSelectedOffers = getSelectedOffers;
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
                        var selectedOffers = getSelectedOffers();
                        console.log(selectedOffers)
                        console.log('on change ' + vm.selectedBrandList); // logs 'on change slider-id'
                        vm.productList = [];
                        vm.productList = productsDisplayFactory.getProducts(selectedOffers,vm.selectedBrandList, vm.slider.min, vm.slider.max);
                        //console.log( vm.productList); // logs 'on change slider-id'
                    },
                }
            };
        }
        setPriceSlider();
        /*console.log("filter component controller brandlist "+vm.brandList);
         console.log("object values = "+Object.values(vm.brandList))*/
        console.log("offers");
        console.log(vm.offersList);
        function getSelectedOffers()
        {
            var offerSel = [];
            for(var i=0; i<vm.offersList.length; i++)
            {
                if(vm.offersList[i].selected == true)
                {
                    offerSel.push(vm.offersList[i]);
                }
            }
            return offerSel;
        }
        function checkOfferSelected()
        {
            var selectedOffers = getSelectedOffers();
            console.log(selectedOffers)
            vm.productList = productsDisplayFactory.getProducts(selectedOffers,vm.selectedBrandList, vm.slider.min, vm.slider.max);

        }
        function checkBrandsSelected()
        {
            console.log(vm.brandList);
            var selectedOffers = getSelectedOffers();
            vm.selectedBrandList = [];
            vm.selectedBrandList = getSelectedBrands(vm.brandList);
            vm.productList = [];
            vm.productList = productsDisplayFactory.getProducts(selectedOffers,vm.selectedBrandList, vm.slider.min, vm.slider.max);

        }
        function searchByBrand(input)
        {
            var selectedOffers = getSelectedOffers();
            console.log('in searchby brand vm.selectedBrandList');
            console.log(vm.selectedBrandList);
            vm.productList = productsDisplayFactory.getProducts(selectedOffers,vm.selectedBrandList, vm.slider.min, vm.slider.max);

        }
        function getSelectedBrands(brandsList)
        {

            var selectedBrands = [];
            for(var i = 0; i<brandsList.length;i++)
            {
                if(brandsList[i].ticked == true)
                {
                    selectedBrands.push(brandsList[i]);
                }
            }
            console.log(selectedBrands);
            return selectedBrands;
        }
        function checkAllSelected()
        {
            if(vm.selectedBrandList.length == vm.brandList.length)
            {
                console.log("all selected");
                vm.productList = $rootScope.products;
            }

        }
        function checkNoneSelected()
        {
            if(vm.selectedBrandList.length  == 0)
            {
                console.log("none selected");
                vm.productList = $rootScope.products;
            }

        }
    }
})();
