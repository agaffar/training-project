/**
 * Created by SB004 on 3/7/2017.
 */

(function(){
    angular.module('myApp.header').controller('resetPasswordController',resetController);
    resetController.$inject = ['$scope','headerFactory','$state','$stateParams','$localStorage','$sessionStorage','Regexes'];
    function resetController ( $scope,headerFactory,$state,$stateParams,$localStorage,$sessionStorage,Regexes)
    {
        var vm = this;
        var reg_token = $stateParams.token;
        vm.emailId = 'message';
        vm.tokenFound;
        vm.regexPasswd = Regexes.regexPasswd;
        vm.resetPassword = resetPassword;
        var query = {};
        query.reg_token = reg_token;
        headerFactory.getEmailbyToken(query).then(function(response)
        {
            if(response.status == "error"){
                vm.tokenFound = false;
                vm.message = "Token expired!! Request for reset again and continue";

            }
            else{
                vm.tokenFound = true;
                vm.emailId = response.data.email;
            }


        },function(data)
        {
            vm.tokenFound = false;
            return null;
        });
        if($localStorage.hasOwnProperty("userDetails")){
            $state.go('home');
        }

        function resetPassword(){
            var valid = validatePasswords(vm.pwd1,vm.pwd2);
            if(valid == true){
                var query = {};
                query.emailId = vm.emailId;
                query.password = vm.pwd1;
                query.token = reg_token;
                headerFactory.resetPassword(query).then(function(response)
                {
                    if(response.status == "ok"){
                        $state.go('home');
                    }
                    else{
                        repc.message = "Token expired!! Request for reset again and continue";
                    }

                },function(data)
                {
                    return null;
                });
                vm.validate = true;
            }
            else{
                vm.validate = false;
            }

        }
        function validatePasswords(){
            if(vm.pwd1 != vm.pwd2){
                vm.message = "Passwords are not matching";
                return false;
            }
            return true;
    }
    }
})();