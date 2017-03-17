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
    headDirectiveController.$inject = ['$scope','$uibModal','headerFactory','$state','$localStorage','$sessionStorage','Regexes'];
    function headDirectiveController($scope,$uibModal,headerFactory, $state,$localStorage,$sessionStorage,Regexes) {
        //console.log("conteoller directive"+$rootScope.products);
        var vm = this;
        vm.viewProduct = viewSelectedProduct;
        vm.message = "hello directive";

        vm.refreshed = [];
        vm.refreshProds = refreshProductList;
        vm.logout = logoutUser;
        vm.loginForm = loginForm;
        vm.RegisterForm = RegisterForm;

        displayUser();
        function RegisterForm() {
            $uibModal.open({
                templateUrl: 'app/partials/registrationform.html',
                controller: function ($uibModalInstance) {
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhh");

                    var vm1 = this;
                    vm1.stringRegex =  Regexes.stringRegex;
                    vm1.regEmail =  Regexes.regEmail;
                    vm1.regexPasswd =  Regexes.regexPasswd;
                    vm1.checkEmailAvailability = checkAvailability;
                    vm1.checkAllAdd = checkAllAdd;
                    vm1.close = close;
                    function close(){
                        $uibModalInstance.close();
                    }
                    function checkAllAdd(){
                        var formDetails = {};
                        formDetails.fname = vm1.fname;
                        formDetails.lname = vm1.lname;
                        formDetails.mailId = vm1.mailId;
                        formDetails.paswd = vm1.paswd;
                        formDetails.phno = vm1.phno;
                        var query={};
                        query.userDetails = formDetails;
                        headerFactory.registerUser(query).then(function(response){
                            if(response.status == "ok"){
                                $uibModalInstance.close();
                                $state.go('home');
                            }
                            else{
                                vm1.message = response.status;
                            }

                        }, function (error) {
                            console.log("error "+error);
                        });
                    }
                    function checkAvailability(){
                        if(vm1.mailId != undefined ){
                            var query =  {};
                            query.emailId = vm1.mailId;
                            headerFactory.checkEmail(query).then(function(response)
                            {
                                if(response.status == "ok"){
                                    if(response.data.length == 0){
                                        vm1.mailExitst = false;
                                    }
                                    else {

                                        vm1.mailExitst = true;
                                    }
                                }
                            },function(data)
                            {
                                return null;
                            });
                        }

                        return true;
                    }
                },
                controllerAs: 'rgc'
            });
        }
        function loginForm() {
            $uibModal.open({
                templateUrl: 'app/partials/loginPage.html',
                controller: function ($uibModalInstance) {

                    var vm1 = this;
                    vm1.checkLogin = checkAndLoginUser;
                    vm1.forgotForm = forgotForm;
                    vm1.close = close;
                    function close(){
                        $uibModalInstance.close();
                    }
                    function forgotForm(){
                        $uibModalInstance.close();
                        loadForgotForm();
                    }
                    function loadForgotForm(){
                        $uibModal.open({
                            templateUrl: 'app/partials/forgot-password.html',
                            controller: function ($uibModalInstance) {
                                console.log("forgot form");
                                var vm2 = this;
                                var emailId = vm2.emailId;
                                console.log("email  "+vm2.emailId)
                                vm2.checkEmailSendLink = checkEmailSendLink;
                                vm2.close = close;
                                function close(){
                                    $uibModalInstance.close();
                                }
                                function checkEmailSendLink(){
                                    var query = {};
                                    query.emailId = vm2.emailId;
                                    headerFactory.checkEmailSendLinkForgot(query).then(function (respone) {
                                        console.log(" in login");
                                        if (respone.status == "error") {
                                            vm2.mailExitst = false;

                                        } else {
                                            console.log("resp");
                                            console.log(respone);
                                            $uibModalInstance.close();
                                            vm2.mailExitst = true;
                                            $state.go('home');

                                        }
                                    }, function (data) {
                                        vm2.mailExitst = false;
                                    });
                                }

                            },
                            controllerAs: 'fgp'
                        });
                    }
                    function checkAndLoginUser() {
                        var emailId = vm1.emailId;
                        var password = vm1.paswd;
                        var query = {};
                        query.emailId = vm1.emailId;
                        query.password = vm1.paswd;
                        headerFactory.checkLoginAuthenticate(query).then(function (respone) {

                            if (respone.status == "ok") {
                                console.log(respone.data);
                                $localStorage.userDetails = respone.data;

                                vm.userDetails = $localStorage.userDetails;
                                vm.userIsLogged = true;
                                displayUser();
                                $uibModalInstance.close();
                                $state.go('home');
                            } else {

                                vm1.validated = false;

                            }
                        }, function (data) {
                            vm1.validated = false;
                        });
                    }
                },
                controllerAs: 'lgc'


            });
        }
        function logoutUser() {
            if ($localStorage.hasOwnProperty("userDetails")) {
                var query = {};
                query.userDetails = $localStorage.userDetails;
                headerFactory.logoutUser(query).then(function (response) {
                    vm.userIsLogged = false;
                    $localStorage.$reset();
                    $state.go('home', {reload: true});

                }, function (data) {

                });
                $state.go('home', {reload: true});
            }
            else {
                vm.userIsLogged = false;
            }
        }
        function displayUser(){
            if ($localStorage.hasOwnProperty("userDetails")) {
                vm.userIsLogged = true;
                console.log($localStorage.userDetails);
                vm.UserName = $localStorage.userDetails.user.firstName + "" + $localStorage.userDetails.user.lastName;
                vm.userEmail = $localStorage.userDetails.user.email;
                vm.auth_token = $localStorage.userDetails.authToken;
                vm.auth_tokenId = $localStorage.userDetails.tokenId;
                vm.userDetails = $localStorage.userDetails;
            }
            else {
                vm.userIsLogged = false;
            }
        }
        function refreshProductList(valueEntered) {
            vm.refreshed = [];
            if(valueEntered.length>2)
            {
                var query = {};
                query.valueEntered = valueEntered;
                headerFactory.getSearched(query).then(function(response)
                {
                    if(response.status == "ok"){
                        vm.refreshed = [];
                        vm.refreshed = response.data;

                    }
                    else{
                        console.log( "no data searched");
                    }
                },function(data)
                {

                });
            } else {
                vm.refreshed = [];
            }
        }
        function viewSelectedProduct(productid){
            $state.go("product",{id:productid});
        }
    }
})();