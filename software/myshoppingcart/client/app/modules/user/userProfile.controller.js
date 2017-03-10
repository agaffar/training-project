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
        vm.loadAddressTable = loadAddressTable;
        vm.deleteAddress = deleteAddress;
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
                    loadAddressTable();
                    //getUserDetailsById();

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
                            loadAddressTable();
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
                        vm.userAddress = response.data.address;
                       /* if(vm.user.address && vm.user.address.length>0){
                           /!* var newAddress = {};
                            vm.user.address.push(newAddress);*!/
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
                            /!*var addressHome = {
                             type : "home",
                             addressLine1 : "",
                             addressLine2 : "",
                             streetVillage : "",
                             type : "home",
                             type : "home",
                             type : "home",

                             };*!/
                           /!* var addressWork = {};
                            vm.user.address = [];
                            vm.user.address.push(addressHome);
                            vm.user.address.push(addressWork);*!/
                            console.log("address");
                            console.log(vm.user.address);
                        }
                        console.log(vm.user);*/
                    }
                    else{
                        console.log("no data found");

                    }
                },
                function(data){

                });

        }
        function deleteAddress(address){
            console.log("in get getUserAddress")
            userFactory.deleteAddress(userId,address).then(function(response){
                console.log("response address");
                console.log(response);

                    if(response.status == "ok"){
                        loadAddressTable();
                       /* if(vm.user.address && vm.user.address.length>0){
                           /!* var newAddress = {};
                            vm.user.address.push(newAddress);*!/
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
                            /!*var addressHome = {
                             type : "home",
                             addressLine1 : "",
                             addressLine2 : "",
                             streetVillage : "",
                             type : "home",
                             type : "home",
                             type : "home",

                             };*!/
                           /!* var addressWork = {};
                            vm.user.address = [];
                            vm.user.address.push(addressHome);
                            vm.user.address.push(addressWork);*!/
                            console.log("address");
                            console.log(vm.user.address);
                        }
                        console.log(vm.user);*/
                    }
                    else{
                        console.log("no data found");

                    }
                },
                function(data){
                    console.log("errror");
                    console.log(data);
                });

        }
        function loadAddressTable(){
            vm.userAddress = [];
            vm.tableParams = new NgTableParams({
                page : 1,
                count: 10
            }, {
                total : vm.userAddress.length,
                getData: function (params) {
                    console.log("params===");
                    console.log(params);
                    params.total(vm.userAddress.length);
                 return   userFactory.getUserAddress(userId).then(function(response){
                            console.log("response address");
                            console.log(response);

                            if(response.status == "ok"){
                                vm.userAddress = response.data.address;
                                console.log("------");
                                console.log(vm.userAddress);

                                vm.data = vm.userAddress.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                //$defer.resolve(vm.data);
                                /* if(vm.user.address && vm.user.address.length>0){
                                 /!* var newAddress = {};
                                 vm.user.address.push(newAddress);*!/
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
                                 /!*var addressHome = {
                                 type : "home",
                                 addressLine1 : "",
                                 addressLine2 : "",
                                 streetVillage : "",
                                 type : "home",
                                 type : "home",
                                 type : "home",

                                 };*!/
                                 /!* var addressWork = {};
                                 vm.user.address = [];
                                 vm.user.address.push(addressHome);
                                 vm.user.address.push(addressWork);*!/
                                 console.log("address");
                                 console.log(vm.user.address);
                                 }
                                 console.log(vm.user);*/
                                return vm.data;
                            }
                            else{
                                console.log("no data found");

                            }
                        },
                        function(data){

                        });
                }
            });
        }
    }
})();