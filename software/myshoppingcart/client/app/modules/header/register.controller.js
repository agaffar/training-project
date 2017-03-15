/**
 * Created by SB004 on 3/6/2017.
 */
/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp.header').controller('registerController',registerController);
    registerController.$inject = ['$scope','headerFactory','$state','$stateParams','$localStorage','$sessionStorage'];
    function registerController ( $scope,headerFactory,$state,$stateParams,$localStorage,$sessionStorage)
    {
        var vm = this;
        var reg_token = $stateParams.token;
        headerFactory.getEmailbyToken(reg_token).then(function(response)
        {
            console.log(response);
            if(response.status == "error"){
                vm.tokenFound = false;
                vm.message = "Token expired!! Might be your registration is confirmed   ";

            }
            else{
                vm.tokenFound = true;
                vm.emailId = response.data;
            }


        },function(data)
        {
            vm.tokenFound = false;
            return null;
        });
        vm.confirmRegistrationUser = confirmRegistrationUser;
        if($localStorage.hasOwnProperty("userDetails")){
            $state.go('home');
        }

        function confirmRegistrationUser(){

            headerFactory.confirmRegistration(reg_token).then(function(response)
            {
                if(response.status =="ok"){
                    $state.go('home');
                }

            },function(data)
            {
                return null;
            });
        }
    }
})();