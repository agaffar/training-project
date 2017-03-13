/**
 * Created by Lenovo on 2/6/2017.
 */
(function () {
    'use strict'
    angular.module('electronics').factory('productsDisplayFactory',productsDisplay);
    function productsDisplay($http,$q,$rootScope,api)
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
            var query = {};
            query.type = type;
            var offersNamesArray = getNamesOfferSelected(offersSelected);
            var brandsNamesArray = getNamesBrands(brandsSelected);

            query.offersSelected = offersNamesArray;
            query.brandsSelected = brandsNamesArray;
            query.min = min;
            query.max = max;

            return api.productsByCategory({q : query}).$promise;

        }
        function getNamesOfferSelected(offersSelected){
            var offerTypes = [];

            for(var i=0;i<offersSelected.length;i++)
            {

                offerTypes.push(offersSelected[i].type);
            }

            return offerTypes;
        }

        function getAllBrandsFromProducts(type)
        {
            ProdType = type;
            var allBrands = [];

            var array = [];
            var brandObject;
            var brandExistList;
            var defered = $q.defer();
            var query = {};
            query.type = ProdType;


            return api.getAllBrandsByType({q : query}).$promise;

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
                }
            }
            return allBrands;
        }
        function getNamesBrands(brandsSelected)
        {
            var brandNames = [];

            for(var i=0;i<brandsSelected.length;i++)
            {

                brandNames.push(brandsSelected[i].name);
            }

            return brandNames;
        }
        function CheckExist(arrayBrandNames,brand)
        {

            var reg = new RegExp(brand,"ig");
            for(var i = 0; i< arrayBrandNames.length;i++)
            {


                if(arrayBrandNames[i].toString().match(reg))
                {

                    return true;
                }
            }
            return false;
        }

        function getAllOffers(productType){
            var allOffers = [];

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

            return allOffers;
        }
        function insertOfferTypes(allOffers,prodOffers){
            for(var i=0;i<prodOffers.length;i++)
            {
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

                if(allOffers[i].type.toString().match(reg))
                {
                    return true;
                }
            }
            return false;
        }
    }
})();
