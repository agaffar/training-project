/**
 * Created by Lenovo on 1/19/2017.
 */
(function () {
    angular.module('viewProduct').controller('viewProductController',viewCtrl);
    viewCtrl.$inject = ['$stateParams','$rootScope','viewProductFactory'];
    function viewCtrl($stateParams,$rootScope,viewProductFactory)
    {

            var vm = this;
            var subType = "";
            var prodId = $stateParams.id;
            var getProduct = getProduct;
            var getSimilarProducts = getSimilarProducts;
            vm.product = getProduct(prodId);
            console.log(vm.product)
            subType = vm.product.subType;
            vm.picPath = "images/"+subType+"/"+prodId+".jpg";
            console.log("vm.imagePath in viewctrl"+vm.picPath);
            vm.currentList = [];
            var similarList = [];
            similarList = getSimilarProducts(subType,prodId);
            //console.log(similarList);
        var allProducts = $rootScope.products;
        vm.currentLastIndex = 0;
        vm.currentStartIndex = 0;
        vm.imagePath = "";
//Change this controller as we discussed.
        function  getSimilarProducts(subType,prodId){
            var simList = [];
            for(var i=0;i<$rootScope.products.length;i++){
                var eachProd = $rootScope.products[i];
                if(eachProd.id != prodId && eachProd.subType.toString() == subType.toString()){
                    simList.push(eachProd);
                }
            }
            return simList;
        }
        var currentSimilarList = function()
        {
            if(similarList.length >= 4)
            {
                var i=0;

                for(i=0;vm.currentList.length<4 && i<similarList.length;i++)
                {
                    /*var product = allProducts[i];
                    //console.log(product.name+" subType "+product.subType+" required subtype"+subType);
                    /!*Use the following code instead of code from line 43 to 53.
                    if(product.id !== prodId && product.subType.toString() == subType.toString()) {
                        vm.currentList.push(product);
                    }*!/
                    if(product.id == prodId )
                    {
                        continue;
                    }
                    else {
                        if(product.subType.toString() == subType.toString())
                        {

                            vm.currentList.push(product);
                        }
                    }*/
                    var eachProd = similarList[i];
                    vm.currentList.push(eachProd);
                }
                vm.currentStartIndex = similarList.indexOf(vm.currentList[0]);
                vm.currentLastIndex = similarList.indexOf(vm.currentList[vm.currentList.length-1]);
                //console.log(vm.currentList[vm.currentList.length-1])
                //console.log("in previous appending currentStartIndex = "+vm.currentStartIndex+" currentLastIndex = "+vm.currentLastIndex);
                if(vm.currentStartIndex == 0){
                    vm.noPrev = true;
                }
                else if(vm.currentStartIndex != 0){
                    vm.noPrev = false;
                }
                if(vm.currentLastIndex == (similarList.length-1)){
                    vm.noNext = true;
                }
                else if(vm.currentLastIndex != (similarList.length-1)) {
                    vm.noNext = false;
                }
            }
        }
        currentSimilarList();
        //console.log(" currentlist length "+vm.currentList.length);
        vm.prevList = previousListofProdducts;
        vm.nextList = nextListofProducts;
        function getProduct(prodId){
            /*for(var i=0;i<$rootScope.products.length;i++)
            {
                var prod = $rootScope.products[i];
                if(prod.id == prodId)
                {
                    //vm.product = prod;
                    //subType = prod.subType;
                    vm.imagePath = "images/"+prod.subType+"/"+prod.id+".jpg";
                    console.log("vm.imagePath === "+vm.imagePath)
                    return prod;
                    //console.log(vm.product.offers);
                }
            }*/
            viewProductFactory.getProduct(prodId).then(function(response)
            {
                console.log("in get productview");
                //console.log(response);
                var product = {};
                    product = response;
                console.log( product);
                return product
            },function(data)
            {
                //console.log(response);

                //console.log(vm.products);
                return null;
            });

        }
        function previousListofProdducts()
        {

            /*if(currentStartIndex>0)
            {
                vm.currentList = [];
                var i=0;
                //I think you are not using the code from line 71 to 75.
                var lastIndex = 0;
                if(currentLastIndex == allProducts.length)
                    lastIndex = currentLastIndex - 1;
                else
                    lastIndex = currentLastIndex;

                //console.log(allProducts);

                    for(i=currentStartIndex;vm.currentList.length<5 && i>=0;i--)
                    {
                        var product = allProducts[i];
                        console.log(product);
                        //console.log(product.name+" subType "+product.subType+" required subtype"+subType);
                        //Same as above
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
                }*/
            //console.log(similarList)
            vm.currentList = [];
            if(vm.currentStartIndex != 0){
                for(var i = vm.currentStartIndex ; vm.currentList.length < 4 && i>=0; i--){
                    //console.log("in prev "+i)
                    var eachProd = similarList[i];
                    vm.currentList.push(eachProd);
                    //console.log(vm.currentList)

                }
                vm.currentStartIndex = similarList.indexOf(vm.currentList[vm.currentList.length-1]);
                vm.currentLastIndex = similarList.indexOf(vm.currentList[0]);
                //console.log(vm.currentList[vm.currentList.length-1])
                if(vm.currentStartIndex < 4){
                    vm.noPrev = true;
                }
                else if(vm.currentStartIndex >= 4){
                    vm.noPrev = false;
                }
                if(vm.currentLastIndex == (similarList.length-1)){
                    vm.noNext = true;
                }
                else if(vm.currentLastIndex != (similarList.length-1)) {
                    vm.noNext = false;
                }
                //console.log("in previous appending currentStartIndex = "+vm.currentStartIndex+" currentLastIndex = "+vm.currentLastIndex);

            }

         /*   if(vm.currentStartIndex <  5 && vm.currentList.length <5)
            {
                //currentStartIndex = 0;
                nextListofProducts();
            }
            else {
            }*/



        }

        function nextListofProducts()
        {
            console.log("in nextlist appending");

          /*  if(vm.currentLastIndex < allProducts.length)
            {

                var i=vm.currentLastIndex;
                if(vm.currentStartIndex <5 && vm.currentList.length <5)
                {
                    vm.currentStartIndex = 0;
                }
                else {
                    vm.currentStartIndex = vm.currentLastIndex;
                }
                vm.currentList = [];
                console.log("currentStartIndex = "+vm.currentStartIndex);
                for(i=vm.currentStartIndex;vm.currentList.length<5 && i<allProducts.length;i++)
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
                vm.currentStartIndex = allProducts.indexOf(vm.currentList[0]);
                vm.currentLastIndex = i;
            }*/
            vm.currentList = [];
            for(var i = vm.currentLastIndex; vm.currentList.length<4 && i<similarList.length ; i++){
                var eachProd = similarList[i];
                vm.currentList.push(eachProd);
            }
            vm.currentStartIndex = similarList.indexOf(vm.currentList[0]);
            vm.currentLastIndex = similarList.indexOf(vm.currentList[vm.currentList.length-1]);
            //console.log(vm.currentList[vm.currentList.length-1])
            if(vm.currentStartIndex == 0){
                vm.noPrev = true;
            }
            else if(vm.currentStartIndex != 0){
                vm.noPrev = false;
            }
            if(vm.currentLastIndex == (similarList.length-1)){
                vm.noNext = true;
            }
            else if(vm.currentLastIndex != (similarList.length-1)) {
                vm.noNext = false;
            }
            //console.log("in next appending currentStartIndex = "+vm.currentStartIndex+" currentLastIndex = "+vm.currentLastIndex);

        }
    }
})();