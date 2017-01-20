/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp.header').controller('headController',headCont);
    headCont.$inject = ['CartData','$rootScope'];
    function headCont (CartData,$rootScope)
    {
        var vm = this;
        //vm.products = $rootScope.products;
        //console.log($rootScope.products);
        var resultObj = function(){
            CartData.getJData().then(function(response)
            {
                //console.log(response);
                $rootScope.products = [];
                $rootScope.products = response;
                //vm.products =
                //console.log(vm.products);
            },function(data)
            {
                //console.log(response);

                //console.log(vm.products);
            });
        }
        resultObj();
            vm.refreshProds = function(valueEntered)
            {

                vm.refreshed = [];
                if(valueEntered)
                {
                    for(var i=0;i<$rootScope.products.length;i++)
                    {
                        var product = $rootScope.products[i];
                        var regex = new RegExp(valueEntered,"ig");
                        console.log(valueEntered);
                        //product.name.toString().match(regex)
                        if(regex.test(product.name))
                        {
                            console.log(valueEntered);
                            console.log(regex.test(product.name));
                            console.log(product.name);
                            vm.refreshed.push(product);
                        }
                    }

                }
               /* vm.limitNameDisplay = 0;
                if(valueEntered.length>2)
                {
                    vm.limitNameDisplay = 500;
                }
                else {
                    vm.limitNameDisplay = 0;
                }*/
               /* console.log("refreshed");
                console.log(refreshed);*/
            }
        vm.selected;





    }
})();