/**
 * Created by Lenovo on 2/2/2017.
 */
(function(){
    angular.module('electronics').component('productFilter',{
        bindings : {
            value:'@',
            productList : '=',
            brandList : '=',
            selectedBrandList : '=',
            offersList : '=',
            productType : '@'
        },
        templateUrl : 'app/partials/product-filter.html',
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
        console.log(vm.productType)
        console.log("in filter component")
        console.log(vm.offersList)

        function setPriceSlider()
        {
            vm.slider = {
                min: $rootScope.min,
                max: $rootScope.max,
                options: {
                    floor: 0,
                    ceil: 100000,
                    step: 10,
                    translate: function(value) {
                        return '&#8377;' + value;
                    },
                    onChange: function() {
                        var selectedOffers = getSelectedOffers();
                    //logs 'on change slider-id'
                        vm.productList = [];
                        productsDisplayFactory.getProducts(vm.productType,selectedOffers,vm.selectedBrandList,vm.slider.min,vm.slider.max).then(function(response)
                        {
                            if(response.status == "ok"){
                                vm.productList = response.data;
                            }
                            else{
                                console.log( "no data retrived");
                            }

                        },function(data)
                        {
                            return null;
                        });
                    },
                }
            };
        }
        setPriceSlider();


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
            productsDisplayFactory.getProducts(vm.productType,selectedOffers,vm.selectedBrandList,vm.slider.min,vm.slider.max).then(function(response)
            {
                if(response.status == "ok"){
                    vm.productList = response.data;
                }
                else{
                    console.log( "no data retrived");
                }
            },function(data)
            {
                return null;
            });
        }
        function checkBrandsSelected()
        {
            var selectedOffers = getSelectedOffers();
            vm.selectedBrandList = [];
            vm.selectedBrandList = getSelectedBrands(vm.brandList);
            vm.productList = [];
            productsDisplayFactory.getProducts(vm.productType,selectedOffers,vm.selectedBrandList,vm.slider.min,vm.slider.max).then(function(response)
            {
                if(response.status == "ok"){
                    vm.productList = response.data;
                }
                else{
                    console.log( "no data retrived");
                }
            },function(data)
            {
                return null;
            });
        }
        function searchByBrand(input)
        {
            var selectedOffers = getSelectedOffers();

            productsDisplayFactory.getProducts(vm.productType,selectedOffers,vm.selectedBrandList,vm.slider.min,vm.slider.max).then(function(response)
            {
                if(response.status == "ok"){
                    vm.productList = response.data;
                }
                else{
                    console.log( "no data retrived");
                }
            },function(data)
            {
                return null;
            });
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
