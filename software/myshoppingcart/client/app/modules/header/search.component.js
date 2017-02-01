/**
 * Created by Lenovo on 1/31/2017.
 */
(function(){
    angular.module('myApp.header').component('searchProduct',{
        bindings:{
            productList :"=",
            viewProduct:"&",
            refreshProds:"&"

        },
        templateUrl:"app/partials/searchbarComp.html",
        controller: searchController,
        controllerAs:"search"
    })
    searchController.$inject=['$scope'];
    function searchController($scope)
    {
        console.log("in search controller component")
    }


})();