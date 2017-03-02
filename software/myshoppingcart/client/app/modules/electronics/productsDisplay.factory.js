/**
 * Created by Lenovo on 2/6/2017.
 */
(function () {
    'use strict'
    angular.module('electronics').factory('productsDisplayFactory',productsDisplay);
    function productsDisplay($rootScope)
    {
        console.log("------ in product display controller ------ ");
        var ProdType;
        var productServices = {

            getProducts : getProductsFiltered,
            getBrands   : getAllBrandsFromProducts,
            getOffers   : getAllOffers
        };

        return productServices;

        function getProductsFiltered(offersSelected,brandsSelected,min,max)
        {

            $rootScope.min = min;
            $rootScope.max = max;
            var productFiltered = [];
            var allProducts = $rootScope.products;

            //console.log("brands selected are none"+brandsSelected)
            if(brandsSelected == undefined || brandsSelected.length == 0)
            {
                //console.log("brands selected are none")
                productFiltered = getAllProdsOfRange($rootScope.products,min,max);
            }
            else
            {
                var brandNames = [];
                brandNames = getNamesBrands(brandsSelected);
                console.log(brandNames+" brandNames")
                for(var i=0;i<allProducts.length;i++)
                {
                    var eachProduct = allProducts[i];
                    var isProdBrandSelected;
                    console.log("selected brands "+brandNames)
                    if((ProdType == "fiction" || ProdType == "comics" || ProdType == "biography") && eachProduct.subType == ProdType)
                        isProdBrandSelected = CheckExist(brandNames,eachProduct.Features.Publisher);
                    else
                    isProdBrandSelected = CheckExist(brandNames,eachProduct.brand);
                    if((eachProduct.productPrice >= min && eachProduct.productPrice <= max) && (isProdBrandSelected == true))
                    {
                        //console.log(eachProduct.brand+"in products filtering ---- "+$rootScope.min+"  "+$rootScope.max);
                        productFiltered.push(eachProduct);
                    }
                }
            }
            console.log("offers selected")
            if(offersSelected != undefined && offersSelected.length != 0)
            {
                console.log("offers selected")
                productFiltered = filterByOffers(productFiltered,offersSelected);
            }
            else {
                console.log("no offers selected")

            }
            console.log(productFiltered)
            return productFiltered;
        }
        function getAllProdsOfRange(allProducts,min,max)
        {
            var prodFilt = [];
            for (var i=0; i<allProducts.length;i++){
                var eachProd = allProducts[i];
                if(eachProd.productPrice >= min && eachProd.productPrice <= max){
                    prodFilt.push(eachProd);
                }
            }
        return prodFilt;
        }
        function filterByOffers(productFiltered,offersSelected)
        {
            var offerProds = [];
            for(var i=0;i<productFiltered.length;i++)
            {
                var eachProd = productFiltered[i];
                var hasSelOffer = checkProdhasSelectedOffer(eachProd,offersSelected);
                if(hasSelOffer)
                {
                    offerProds.push(eachProd);
                }
            }
        return offerProds;
        }
        function checkProdhasSelectedOffer(eachProd,offersSelected)
        {
            for(var i=0;i<eachProd.offers.length;i++)
            {
                if(checkOfferExist(offersSelected,eachProd.offers[i].type) == true)
                {
                    return true;
                }

            }
            return false;
        }
        function getAllBrandsFromProducts(type)
        {
            ProdType = type;
            console.log("type "+type)
            var allBrands = [];
            var allProducts = $rootScope.products;
            var array = [];
            var brandObject;
            var brandExistList;
         /*   for(var i=0;i<allProducts.length;i++)
            {
                var eachProduct = allProducts[i];
                var reg;
                if((type == "fiction" || type == "comics" || type == "biography") && eachProduct.subType == type)
                {
                    reg = new RegExp(eachProduct.Features.Publisher,"ig");
                    brandExistList = CheckExist(array,eachProduct.Features.Publisher);
                    console.log(brandExistList)
                }
                else
                {
                    brandExistList = CheckExist(array,eachProduct.brand);
                    reg = new RegExp(eachProduct.brand,"ig");
                }
                console.log("brandsssss "+eachProduct.Publisher);

                if((eachProduct.subType == type) && (brandExistList == false))
                {
                    //console.log("brandsssss "+eachProduct.Features.Publisher);
                    brandObject = {};
                    if(type == "fiction" || type == "comics" || type == "biography")
                    {
                        brandObject.name = eachProduct.Features.Publisher;
                        console.log("brandObject.name  "+brandObject.name)
                    }
                    else {
                        brandObject.name = eachProduct.brand;
                    }

                    allBrands.push(brandObject);
                    array.push(brandObject.name);
                    //console.log(brandObject+"    "+i+")"+allBrands[i]+"  values   "+Object.values(allBrands[0])+"  length of brands list "+allBrands.length);
                }


            }*/
            //console.log(allBrands);
            $http.get('/api/products/search?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json");
            })
            return defered.promise;
            //return allBrands;
        }
        function getNamesBrands(brandsSelected)
        {
            var brandNames = [];
            console.log("brands")
            console.log(brandsSelected)
            for(var i=0;i<brandsSelected.length;i++)
            {
                console.log(brandsSelected[i].name)
                brandNames.push(brandsSelected[i].name);
            }
            console.log(brandNames);
            //console.log("selected brands");

            //console.log(brandsSelected);

            return brandNames;
        }
        function CheckExist(arrayBrandNames,brand)
        {
            console.log("hhh"+arrayBrandNames)

            console.log("hhh"+brand)
            var reg = new RegExp(brand,"ig");
            for(var i = 0; i< arrayBrandNames.length;i++)
            {
                //console.log(brand+"hhhh "+arrayBrandNames[i])

                if(arrayBrandNames[i].toString().match(reg))
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

        function getAllOffers(type){
            var allProducts = $rootScope.products;
            var allOffers = [];
            for(var i = 0;i<allProducts.length;i++)
            {
                var eachProd = allProducts[i];
                if(eachProd.subType == type){
                    allOffers = insertOfferTypes(allOffers,eachProd.offers);
                    //allOffers.push(eachProd.offers);
                }
            }
            console.log(allOffers);
            return allOffers;
        }
        function insertOfferTypes(allOffers,prodOffers){
            for(var i=0;i<prodOffers.length;i++)
            {
                console.log(prodOffers[i].type);
                var checkAlready = checkOfferExist(allOffers,prodOffers[i].type);
                if(checkAlready == false)
                    allOffers.push({"type" : prodOffers[i].type});
            }
            return allOffers;
        }
        function checkOfferExist(allOffers,type)
        {
            var reg = new RegExp(type,"ig");
            for(var i = 0; i< allOffers.length;i++)
            {
                //console.log(brand+"hhhh "+arrayBrandNames[i])

                if(allOffers[i].type.toString().match(reg))
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
