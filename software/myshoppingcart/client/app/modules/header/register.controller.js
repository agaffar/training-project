/**
 * Created by SB004 on 3/6/2017.
 */
/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp.header').controller('registerController',registerController);
    registerController.$inject = ['$scope','headerFactory','$state','$stateParams'];
    function registerController ( $scope,headerFactory,$state,$stateParams)
    {
        var vm = this;
        console.log($stateParams);
        var reg_token = $stateParams.token;
        console.log("token ------- "+token);
        function confirmRegistration(){
            console.log("checkEmail id = "+token);
            headerFactory.confirmRegistration(reg_token).then(function(response)
            {
                console.log(response);

            },function(data)
            {
                return null;
            });
        }
    }
})();