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
        console.log($stateParams);
        var reg_token = $stateParams.token;
        console.log("token ------- "+reg_token);
        vm.confirmRegistrationUser = confirmRegistrationUser;
        if($localStorage.hasOwnProperty("userDetails")){
            $state.go('home');
        }

        function confirmRegistrationUser(){

            console.log("checkEmail id = "+reg_token);

            headerFactory.confirmRegistration(reg_token).then(function(response)
            {
                console.log(response);
                if(response.hasOwnProperty("ok")){
                    $state.go('home');
                }

            },function(data)
            {
                return null;
            });
        }
    }
})();