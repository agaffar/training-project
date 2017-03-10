/**
 * Created by SB004 on 3/9/2017.
 */
(function(){
    angular.module('user').controller('userProfileController',userProfileController);
    userProfileController.$inject = ['$scope','userFactory','$uibModal','api','$rootScope', '$timeout','$state','$stateParams','NgTableParams'];
    function userProfileController ( $scope,userFactory, $uibModal,api,$rootScope, $timeout,$state,$stateParams,NgTableParams)
    {
        var vm = this;
        vm.saveAddress = saveAddress;
        vm.loadAddressForm = loadAddressForm;
        vm.getUserAddress = getUserAddress;
        console.log("$stateParams ---- "+$stateParams)
        console.log($stateParams)

        var userId = $stateParams.userId;
        console.log("userId ---- "+userId)
        getUserDetailsById();
        function loadAddressForm(address){
            console.log("address to modal");
            console.log(address)
            $uibModal.open({
                templateUrl: 'app/partials/address-form.html',
                controller: function ($uibModalInstance) {
                    console.log("address form");
                    var vm1 = this;
                    vm1.selectTypes = ["Home","Work"];
                    if(address == undefined || address == null)
                         vm1.address = {};
                    else
                        vm1.address = address;
                    console.log("vm1.selectTypes  "+vm1.selectTypes);
                    vm1.saveAddressModal = saveAddressModal;
                    //$uibModalInstance.close();
                    /*
                    function checkEmailSendLink(){
                        headerFactory.checkEmailSendLinkForgot(vm2.emailId).then(function (respone) {
                            console.log(" in login");
                            if (respone.status == "EmailNotFound") {
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
*/
                    function saveAddressModal(address){
                        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu "+address);
                        console.log(address);
                        saveAddress(address);
                        $uibModalInstance.close();
                    }
                },
                controllerAs: 'adc'
            });

        }
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
        function getUserDetailsById() {
            userFactory.getUserData(userId).then(function(response){
                    if(response.status == "ok"){
                        vm.user = response.data;
                        if(vm.user.address && vm.user.address.length>0){
                           /* var newAddress = {};
                            vm.user.address.push(newAddress);*/
                            console.log(vm.user.address);
                            vm.addressNewEntry = false;
                            getUserAddress();
                            //console.log(vm.addressNewEntry);

                            //debugger;
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
                           /* var addressWork = {};
                            vm.user.address = [];
                            vm.user.address.push(addressHome);
                            vm.user.address.push(addressWork);*/
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
        function getUserAddress(){
            console.log("in get getUserAddress")
            userFactory.getUserAddress(userId).then(function(response){
                console.log("response address");
                console.log(response);

                    if(response.status == "ok"){
                        vm.user.address = response.data.address;
                        if(vm.user.address && vm.user.address.length>0){
                           /* var newAddress = {};
                            vm.user.address.push(newAddress);*/
                            var data = vm.user.address;
                            //debugger;

                            vm.tableParams = new NgTableParams({
                                count: 10
                            }, {
                                dataset: data
                            });
                            //debugger;
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
                           /* var addressWork = {};
                            vm.user.address = [];
                            vm.user.address.push(addressHome);
                            vm.user.address.push(addressWork);*/
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