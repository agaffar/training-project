/**
 * Created by Lenovo on 2/6/2017.
 */
(function () {
    'use strict'
    angular.module('electronics').factory('productsDisplayFactory',productsDisplay);
    function productsDisplay($rootScope)
    {
        console.log("------ in product display controller ------ ");

        var productServices = {
            getProducts : getProductsFiltered,
            getBrands   : getAllBrandsFromProducts

        };

        return productServices;

        function getProductsFiltered(brandsSelected,min,max)
        {
            $rootScope.min = min;
            $rootScope.max = max;
            var productFiltered = [];
            var allProducts = $rootScope.products;
            console.log("brands selected are none"+brandsSelected)
            if(brandsSelected.length == 0 || brandsSelected == undefined)
            {
                //console.log("brands selected are none")
                productFiltered = $rootScope.products
            }
            else
            {
                for(var i=0;i<allProducts.length;i++)
                {
                    var eachProduct = allProducts[i];
                    var brandNames = [];
                    brandNames = getNamesBrands(brandsSelected);
                    console.log("selected brands "+brandNames)
                    var isProdBrandSelected = CheckExist(brandNames,eachProduct.brand);
                    if((eachProduct.price >= min && eachProduct.price <= max) && (isProdBrandSelected == true))
                    {
                        //console.log(eachProduct.brand+"in products filtering ---- "+$rootScope.min+"  "+$rootScope.max);
                        productFiltered.push(eachProduct);
                    }
                }
            }
            console.log(productFiltered)
            return productFiltered;
        }
        function getAllBrandsFromProducts(type)
        {
            var allBrands = [];
            var allProducts = $rootScope.products;
            var array = [];
            var brandObject;
            for(var i=0;i<allProducts.length;i++)
            {
                var eachProduct = allProducts[i];
                var reg = new RegExp(eachProduct.brand,"ig");
                var brandExistList = CheckExist(array,eachProduct.brand);
                if((eachProduct.subType == type) && (brandExistList == false))
                {
                    //console.log("brandsssss "+eachProduct.brand);
                    brandObject = {};
                    brandObject.name = eachProduct.brand;
                    allBrands.push(brandObject);
                    array.push(brandObject.name);
                    //console.log(brandObject+"    "+i+")"+allBrands[i]+"  values   "+Object.values(allBrands[0])+"  length of brands list "+allBrands.length);
                }


            }
            //console.log(allBrands);
            return allBrands;
        }
        function getNamesBrands(brandsSelected)
        {
            var brandNames = [];
            //console.log(brandsSelected)
            for(var i=0;i<brandsSelected.length;i++)
            {
                //console.log(brandsSelected[i])
                brandNames.push(brandsSelected[i].name);
            }
            //console.log(brandNames);
            //console.log("selected brands");

            //console.log(brandsSelected);

            return brandNames;
        }
        function CheckExist(arrayBrandNames,brand)
        {
            var reg = new RegExp(brand,"ig");
            //console.log(brand+"hhhh "+arrayBrandNames)
            for(var i = 0; i< arrayBrandNames.length;i++)
            {
                if(arrayBrandNames[i].match(reg))
                {
                    //console.log(brand+"    reg "+reg)
                    return true;
                }
                else {
                    //console.log("brand "+brand+" is not existing in list");
                }
            }
            return false;
        }
    }
})();
