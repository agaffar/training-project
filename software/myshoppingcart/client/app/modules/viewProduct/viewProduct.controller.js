/**
 * Created by Lenovo on 1/19/2017.
 */
(function () {
    angular.module('viewProduct').controller('viewProductController',viewCtrl);
    viewCtrl.$inject = ['$stateParams','$rootScope'];
    function viewCtrl($stateParams,$rootScope)
    {
            var vm = this;
            var subType = "";
            var prodId = $stateParams.id;
            vm.currentList = [];
        //var ter = vm.message;
        //console.log("stateparam = "+ $stateParams.id);
            for(var i=0;i<$rootScope.products.length;i++)
            {
                var prod = $rootScope.products[i];
                if(prod.id == prodId)
                {
                    vm.product = prod;
                    subType = prod.subType;
                    console.log(vm.product.offers);
                }
            }
        //vm.prodName = vm.product.name;
        var allProducts = $rootScope.products;
        var currentLastIndex = 0;
        var currentStartIndex = 0;

        var currentSimilarList = function()
        {
            if(allProducts.length >= 5)
            {
                var i=0;
                for(i=0;vm.currentList.length<5;i++)
                {
                    var product = allProducts[i];
                    //console.log(product.name+" subType "+product.subType+" required subtype"+subType);
                    if(product.id == prodId )
                    {
                        continue;
                    }
                    else {
                        if(product.subType.toString() == subType.toString())
                        {

                            vm.currentList.push(product);
                        }
                    }

                }
                currentLastIndex = i;
            }
        }
        currentSimilarList();
        console.log(" currentlist length "+vm.currentList.length);
        vm.prevList = previousListofProdducts;
        vm.nextList = nextListofProducts;
        function previousListofProdducts()
        {

            if(currentStartIndex>0)
            {
                vm.currentList = [];
                var i=0;
                var lastIndex = 0;
                if(currentLastIndex == allProducts.length)
                    lastIndex = currentLastIndex - 1;
                else
                    lastIndex = currentLastIndex

                //console.log(allProducts);

                    for(i=currentStartIndex;vm.currentList.length<5 && i>=0;i--)
                    {
                        var product = allProducts[i];
                        console.log(product);
                        //console.log(product.name+" subType "+product.subType+" required subtype"+subType);
                        if(product.id == prodId )
                        {
                            continue;
                        }
                        else {
                            if(product.subType.toString() == subType.toString())
                            {

                                vm.currentList.push(product);
                            }
                        }

                    }
                    currentLastIndex = allProducts.indexOf(vm.currentList[0]);
                    currentStartIndex  = allProducts.indexOf(vm.currentList[vm.currentList.length-1]);
                }
            if(currentStartIndex <  5 && vm.currentList.length <5)
            {
                //currentStartIndex = 0;
                nextListofProducts();
            }
            else {


            }

                console.log("in previous appending currentStartIndex = "+currentStartIndex+" currentLastIndex = "+currentLastIndex);


        }

        function nextListofProducts()
        {
            console.log("in nextlist appending");

            if(currentLastIndex < allProducts.length)
            {

                var i=currentLastIndex;
                if(currentStartIndex <5 && vm.currentList.length <5)
                {
                    currentStartIndex = 0;
                }
                else {
                    currentStartIndex = currentLastIndex;
                }
                vm.currentList = [];
                console.log("currentStartIndex = "+currentStartIndex);
                for(i=currentStartIndex;vm.currentList.length<5 && i<allProducts.length;i++)
                {
                    var product = allProducts[i];
                    if(product.id == prodId )
                    {
                        continue;
                    }
                    else {
                        if(product.subType.toString() == subType.toString())
                        {
                            console.log(product.name+" subType "+product.subType+" required subtype"+subType);
                            vm.currentList.push(product);
                        }
                    }

                }
                currentStartIndex = allProducts.indexOf(vm.currentList[0]);
                currentLastIndex = i;
            }
            console.log("in next appending currentStartIndex = "+currentStartIndex+" currentLastIndex = "+currentLastIndex);

        }
    }
})();