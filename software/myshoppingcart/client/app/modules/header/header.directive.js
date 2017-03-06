/**
 * Created by Lenovo on 1/25/2017.
 */
(function(){
    //Use component instead of directive.
    angular.module('myApp.header').directive('myHeader',headerDirective);
    function headerDirective()
    {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/partials/header.html',
            link : linkFunction,
            controller : headDirectiveController,
            controllerAs : "headc",
            bindToController: true,
            scope: true
        }
        function  linkFunction(scope,elements,attr)
        {
            //console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh ");

        }

        return directive;
    }
    headDirectiveController.$inject = ['$scope','headerFactory','$state'];
    function headDirectiveController($scope,headerFactory, $state)
    {
        //console.log("conteoller directive"+$rootScope.products);
        var vm = this;
        vm.viewProduct = viewSelectedProduct;
        vm.message = "hello directive";
        //console.log(vm.message);
        vm.refreshed = [];
        vm.refreshProds = refreshProductList;
        vm.checkEmailAvailability = checkAvailability;
        vm.checkAllAdd = checkAllAdd;
        function checkAllAdd(){
            var formDetails = {};
            formDetails.fname = vm.fname;
            formDetails.lname = vm.lname;
            formDetails.mailId = vm.mailId;
            formDetails.paswd = vm.paswd;
            formDetails.phno = vm.phno;
            if(validateDetails(formDetails)){
                console.log("validateed");
                headerFactory.registerUser(formDetails).then(function(response){
                    console.log("response "+response);
                }, function (error) {
                    console.log("error "+error);
                })
            }
            else {
                vm.validated = false;
            }
            console.log("submittt"+vm.mailId)
        }
        function validateDetails(formDetails){
            var stringRegex = /^[A-z]+$/;
            var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var regexPasswd = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})";
            if(!formDetails.fname.match(stringRegex)){
            document.getElementById("fname").focus();
                return false;
            }
            if(!formDetails.lname.match(stringRegex)){
                document.getElementById("lname").focus();
                return false;

            }
            if(!formDetails.mailId.match(regEmail)){
                document.getElementById("mailId").focus();
                return false;

            }
            if(!formDetails.paswd.match(regexPasswd)){
                document.getElementById("paswd").focus();
                return false;

            }
        return true;
        }
        //console.log("dddd");
        function checkAvailability(){
            console.log("checkEmail id 2 = "+vm.mailId);
            headerFactory.checkEmail(vm.mailId).then(function(response)
            {
               if(response.length == 0){
                   vm.mailExitst = false;
                   document.getElementById("mailId").focus();
                   console.log("not exists "+ vm.mailExitst)
               }
                else {

                   vm.mailExitst = true;
                   console.log("exists "+ vm.mailExitst)
               }
            },function(data)
            {
                return null;
            });
            return true;
        }
        function refreshProductList(valueEntered)
        {
            vm.refreshed = [];
            //console.log("entered fun");
            //$scope.$apply(function() {
            //console.log($rootScope.products);
            if(valueEntered.length>2)
            {
                var regex = new RegExp(valueEntered,"ig");
                headerFactory.getSearched(valueEntered).then(function(response)
                {
                    console.log("in header");
                    //console.log(response);
                    vm.refreshed = [];
                    vm.refreshed = response;
                    console.log( vm.refreshed);
                   /* if(refreshed.length ) {
                        vm.refreshed = refreshed;
                        console.log(vm.refreshed.length + "  length");
                        console.log(vm.refreshed);
                    }*/
                },function(data)
                {
                    //console.log(response);

                    //console.log(vm.products);
                    //return null;
                });
              /*  for(var i=0;i<$rootScope.products.length;i++)
                {
                    var product = $rootScope.products[i];
                    //console.log(valueEntered+"  regex= "+regex);

                    if(product.productName.toString().match(regex))
                    {
                        //console.log("for entered"+valueEntered+" ,"+product.name+" has "+regex+" = "+product.name.toString().match(regex));
                        refreshed.push(product);
                    }
                }*/
                console.log( vm.refreshed.length);


            } else {
                vm.refreshed = [];
            }


            //});
        }
        function viewSelectedProduct(productid)
        {

            console.log("state go = "+productid);
            $state.go("product",{id:productid});
        }
    }
})();