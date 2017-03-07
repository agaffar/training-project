/**
 * Created by SB004 on 3/7/2017.
 */

(function(){
    angular.module('myApp.header').controller('resetPasswordController',resetController);
    resetController.$inject = ['$scope','headerFactory','$state','$stateParams','$localStorage','$sessionStorage'];
    function resetController ( $scope,headerFactory,$state,$stateParams,$localStorage,$sessionStorage)
    {
        var vm = this;
        console.log($stateParams);
        var reg_token = $stateParams.token;
        console.log("token in resetpassword ------- "+reg_token);
        vm.emailId = 'message';
        vm.resetPassword = resetPassword;
        headerFactory.getEmailbyToken(reg_token).then(function(response)
        {
            console.log(response);
           vm.emailId = response;
            console.log(vm.emailId)

        },function(data)
        {
            return null;
        });
        if($localStorage.hasOwnProperty("userDetails")){
            $state.go('home');
        }

        function resetPassword(){
            console.log("checkEmail id = "+reg_token);
            var valid = validatePasswords(vm.pwd1,vm.pwd2);
            if(valid == true){
                headerFactory.resetPassword(vm.emailId,vm.pwd1,reg_token).then(function(response)
                {
                    console.log(response);
                    if(response.hasOwnProperty("ok")){
                        console.log("password is reset");
                        $state.go('home');
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
        function validatePasswords(passwd1,passwd2){
            var regexPasswd = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})";
            if(!passwd1.match(regexPasswd) || !passwd2.match(regexPasswd)){
                vm.message = "Passwords are not according to password policy";
                document.getElementById("pwd1").focus();
                return false;
            }
            if(passwd1 != passwd2){
                vm.message = "Passwords are not matching";
                document.getElementById("pwd1"  ).focus();
                return false;
            }
            return true;
    }
    }
})();