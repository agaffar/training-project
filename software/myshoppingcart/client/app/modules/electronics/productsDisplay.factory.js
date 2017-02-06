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
            getProducts : getProductsFiltered
        };

        return productServices;

        function getProductsFiltered(min,max)
        {
            $rootScope.min = min;
            $rootScope.max = max;
            var productFiltered = [];
            var allProducts = $rootScope.products;
            for(var i=0;i<allProducts.length;i++)
            {
                var eachProduct = allProducts[i];
                if(eachProduct.price >= min && eachProduct.price <= max)
                {
                    console.log("in products filtering ---- "+$rootScope.min+"  "+$rootScope.max);
                    productFiltered.push(eachProduct);
                }
            }
            return productFiltered;
        }

    }
})();