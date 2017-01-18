/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp.header').controller('headController',headCont);
    headCont.$inject = ['CartData'];
    function headCont (CartData)
    {
        var vm = this;

        vm.products = [];
          var allProducts = CartData.getJData();
            console.log("jjj");
            alert("jhhjh");
            allProducts.success(function(response)
            {
                console.log("search");
                vm.products = response.electronics;

                console.log(vm.products);
                //return response.electronics;
            });

        vm.selected;





    }
})();