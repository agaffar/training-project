/**
 * Created by SB004 on 3/7/2017.
 */
/**
 * Created by Lenovo on 1/31/2017.
 */
(function(){
    angular.module('myApp.header').component('loginForm',{
        bindings:{
        },
        templateUrl:"app/partials/loginPage.html",
        controller: loginController,
        controllerAs:"lgc"
    })
    loginController.$inject=['$scope','headerFactory','$state','$stateParams','$localStorage','$sessionStorage'];
    function loginController($scope,headerFactory,$state,$stateParams,$localStorage,$sessionStorage)
    {
        console.log("in login controller component")
        var vm = this;
        vm.checkLogin = checkAndLoginUser;
    function checkAndLoginUser(){
        var emailId = vm.emailId;
        var password = vm.paswd;
        headerFactory.checkLoginAuthenticate(emailId,password).then(function(respone){
            console.log(" in login");
            if(respone.status == "ok"){
                console.log(" succes loggin");
                console.log(respone);
                $localStorage.userDetails = respone.data;
                console.log("$localStorage.userDetails  ");
                console.log($localStorage.userDetails);
                //$uibModalInstance.close();
                $state.go('home',{reload : true});
            }else {
                console.log("error resp");
                console.log(respone);
                vm.validated = false;

            }
        },function(data){
            vm.validated = false;
        });
    }
}


})();