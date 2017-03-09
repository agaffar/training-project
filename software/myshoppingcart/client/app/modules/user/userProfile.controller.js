/**
 * Created by SB004 on 3/9/2017.
 */
(function(){
    angular.module('user').controller('userProfileController',userProfileController);
    userProfileController.$inject = ['$scope','userFactory', 'api','$rootScope', '$timeout','$state','$stateParams'];
    function userProfileController ( $scope,userFactory, api,$rootScope, $timeout,$state,$stateParams)
    {
        var vm = this;
        vm.saveAddress = saveAddress;
        console.log("$stateParams ---- "+$stateParams)
        console.log($stateParams)
        vm.selectTypes = ["Home","Work"];
        var auth_tokenId = $stateParams.authtokenId;
        console.log("auth_token ---- "+auth_tokenId)
        getUserDetailsById();
        function saveAddress(address){
            console.log("address to save");
            console.log(address);
            userFactory.saveAddress(address,vm.user._id).then(function(response){
                if(response.status == "ok"){
                    console.log("succes");
                    console.log(response);
                    getUserDetailsById();
                    //$state.go("profile",{authtoken:auth_tokenId});
                }
            },
            function(data){

            });
        }
        function getUserDetailsById()
        {
            userFactory.getUserData(auth_tokenId).then(function(response){
                    if(response.status == "ok"){
                        vm.user = response.data;
                        if(vm.user.address && vm.user.address.length>0){
                            var newAddress = {};
                            vm.user.address.push(newAddress);
                            console.log(vm.user.address);
                            vm.addressNewEntry = false;
                            console.log(vm.addressNewEntry)

                        }
                        else {

                            console.log(vm.selectTypes);
                            vm.addressNewEntry = true;
                            var addressHome = {};
                            /*var addressHome = {
                             type : "home",
                             addressLine1 : "",
                             addressLine2 : "",
                             streetVillage : "",
                             type : "home",
                             type : "home",
                             type : "home",

                             };*/
                            var addressWork = {};
                            vm.user.address = [];
                            vm.user.address.push(addressHome);
                            vm.user.address.push(addressWork);
                            console.log("address");
                            console.log(vm.user.address);
                        }
                        console.log(vm.user);
                    }
                    else{
                        console.log("no data found");

                    }
                },
                function(data){

                });
        }
    }
})();