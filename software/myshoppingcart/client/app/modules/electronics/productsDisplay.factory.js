/**
 * Created by Lenovo on 2/6/2017.
 */
(function () {
    'use strict'
    angular.module('electronics').factory('productsDisplayFactory',productsDisplay);
    function productsDisplay($http,$q,$rootScope)
    {
        console.log("------ in product display controller ------ ");
        var ProdType;
        var productServices = {

            getProducts : getProductsFiltered,
            getBrands   : getAllBrandsFromProducts,
            getOffers   : getAllOffers,
            removeDuplicates : removeDuplicates
        };

        return productServices;

        function getProductsFiltered(type,offersSelected,brandsSelected,min,max)
        {
            var productFiltered = [];
            var defered = $q.defer();
            console.log("type home factory = "+type);
            var query = {};
            query.type = type;
            var offersNamesArray = getNamesOfferSelected(offersSelected);
            var brandsNamesArray = getNamesBrands(brandsSelected);

            query.offersSelected = offersNamesArray;
            query.brandsSelected = brandsNamesArray;
            query.min = min;
            query.max = max;
            console.log("sending requesting to server");
            console.log(query);

            $http.get('/api/products/category?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;

                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json");
            })
            return defered.promise;
            //var allProducts = $rootScope.products;

            //console.log("brands selected are none"+brandsSelected)
            /*if(brandsSelected == undefined || brandsSelected.length == 0)
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
            return productFiltered;*/

        }
        function getNamesOfferSelected(offersSelected){
            var offerTypes = [];
            console.log("offerTypes")
            console.log(offersSelected)
            for(var i=0;i<offersSelected.length;i++)
            {
                console.log(offersSelected[i].type)
                offerTypes.push(offersSelected[i].type);
            }
            console.log(offerTypes);
            //console.log("selected brands");

            //console.log(brandsSelected);

            return offerTypes;
        }
        /*function getAllProdsOfRange(allProducts,min,max)
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
        }*/
        function getAllBrandsFromProducts(type)
        {
            ProdType = type;
            console.log("type "+type)
            var allBrands = [];
            //var allProducts = typeProducts;
            var array = [];
            var brandObject;
            var brandExistList;
            var defered = $q.defer();
            console.log("type home factory = "+ProdType);
            var query = {};
            query.type = ProdType;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/api/products/brands?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json");
            })
            return defered.promise;

            //console.log(allBrands);

            //return allBrands;
        }
        function removeDuplicates(allBrandsRetrieved){
            var brandExistList;
            var brandObject;
            var allBrands = [];
            var array = [];
            for(var i=0;i<allBrandsRetrieved.length;i++)
            {
                var eachBrand = allBrandsRetrieved[i];
                var reg;
                brandExistList = CheckExist(array,eachBrand);
                reg = new RegExp(eachBrand,"ig");
                if((brandExistList == false))
                {
                    brandObject = {};
                    brandObject.name = eachBrand;
                    allBrands.push(brandObject);
                    array.push(brandObject.name);
                    //console.log(brandObject+"    "+i+")"+allBrands[i]+"  values   "+Object.values(allBrands[0])+"  length of brands list "+allBrands.length);
                }
            }
            return allBrands;
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

        function getAllOffers(productType){
            //var allProducts = typeProducts;
            var allOffers = [];
            /*for(var i = 0;i<allProducts.length;i++)
            {
                var eachProd = allProducts[i];
                //allOffers = insertOfferTypes(allOffers,eachProd.offers);
                console.log(allOffers);
            }*/
           /* "exchange",
                "discount",
                "No offer",
                "Bank offer",
                "Bank Offer",
                "AmazonBasics 14-Inch Laptop Sleeves (Black)",
                "Special Offer Flat",
                "Acer Laptop Backpack",
                "OnsiteGo 2 Year Extended Warranty for Laptops from Rs. 50001 to Rs. 70000",
                "Saco Soft Durable Pouch for HCL ME G1 10 inch Tablet"*/
            if(productType == "laptop"){
                allOffers.push({"type" : "exchange"});
                allOffers.push({"type" : "discount"});
                allOffers.push({"type" : "No offer"});
                allOffers.push({"type" : "Bank offer"});
                allOffers.push({"type" : "AmazonBasics 14-Inch Laptop Sleeves (Black)"});
                allOffers.push({"type" : "Special Offer Flat"});
                allOffers.push({"type" : "Acer Laptop Backpack"});
                allOffers.push({"type" : "OnsiteGo 2 Year Extended Warranty for Laptops from Rs. 50001 to Rs. 70000"});
                allOffers.push({"type" : "Saco Soft Durable Pouch for HCL ME G1 10 inch Tablet"});
            }
            else {
                allOffers.push({"type" : "exchange"});
                allOffers.push({"type" : "discount"});
                allOffers.push({"type" : "No offer"});
                allOffers.push({"type" : "Bank offer"});
                allOffers.push({"type" : "Special Offer Flat"});
            }
            /*var defered = $q.defer();
            console.log("offer eddd factory = "+type);
            var query = {};
            query.type = type;
            console.log("sending requesting to server");
            console.log(typeof query);
            $http.get('/api/products/offers?q='+JSON.stringify(query)).success(function (response)
            {
                //defered = response.data;
                defered.resolve(response);
                console.log("in header factory response");
                console.log(response);
            }).error(function (response){
                defered.reject("failed to load json");
            })
            return defered.promise;*/
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
