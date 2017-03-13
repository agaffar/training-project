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
        var similarList = [];
        vm.currentList = [];
        viewProductFactory.getProduct(prodId).then(function(response)
        {

            if(response.status == "ok"){
                var product = {};
                product = response.data;
                vm.product = product;
                subType = vm.product.subType;
                vm.picPath = "images/"+subType+"/"+prodId+".jpg";
                similarList = [];
                similarList = getSimilarProducts(prodId,subType);
            }
            else{
                console.log("data not found");
            }

        },function(data)
        {
            return null;
        });
        vm.currentLastIndex = 0;
        vm.currentStartIndex = 0;
        vm.imagePath = "";
//Change this controller as we discussed.

        var currentSimilarList = function()
        {
            if(similarList.length >= 4)
            {
                var i=0;

                for(i=0;vm.currentList.length<4 && i<similarList.length;i++)
                {

                    var eachProd = similarList[i];
                    vm.currentList.push(eachProd);
                }
                vm.currentStartIndex = similarList.indexOf(vm.currentList[0]);
                vm.currentLastIndex = similarList.indexOf(vm.currentList[vm.currentList.length-1]);

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

        //console.log(" currentlist length "+vm.currentList.length);
        vm.prevList = previousListofProdducts;
        vm.nextList = nextListofProducts;
        function getSimilarProducts(prodId,subType){
            viewProductFactory.getSimilarProducts(prodId,subType).then(function(response)
            {

                if(response.status == "ok"){
                    similarList = response.data;;
                    currentSimilarList();
                }
                else{
                    console.log("something went wronr");
                }

            },function(data)
            {
                return null;
            });;
        }
        function previousListofProdducts() {

            vm.currentList = [];
            if(vm.currentStartIndex != 0){
                for(var i = vm.currentStartIndex-1 ; vm.currentList.length < 4 && i>=0; i--){

                    var eachProd = similarList[i];
                    vm.currentList.push(eachProd);


                }
                vm.currentStartIndex = similarList.indexOf(vm.currentList[vm.currentList.length-1]);
                vm.currentLastIndex = similarList.indexOf(vm.currentList[0]);
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

            }

        }

        function nextListofProducts()
        {

            vm.currentList = [];
            for(var i = vm.currentLastIndex+1; vm.currentList.length<4 && i<similarList.length ; i++){
                var eachProd = similarList[i];
                vm.currentList.push(eachProd);
            }
            vm.currentStartIndex = similarList.indexOf(vm.currentList[0]);
            vm.currentLastIndex = similarList.indexOf(vm.currentList[vm.currentList.length-1]);
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
})();