/**
 * Created by SB004 on 3/9/2017.
 */
(function(){
    angular.module('user').controller('userProfileController',userProfileController);
    userProfileController.$inject = ['$scope','userFactory','$uibModal','api','$rootScope', '$timeout','$state','$stateParams','NgTableParams','$filter'];
    function userProfileController ( $scope,userFactory, $uibModal,api,$rootScope, $timeout,$state,$stateParams,NgTableParams,$filter)
    {
        var vm = this;
        vm.saveAddress = saveAddress;
        vm.loadAddressForm = loadAddressForm;
        vm.getUserAddress = getUserAddress;
        vm.loadAddressTable = loadAddressTable;
        vm.deleteAddress = deleteAddress;
        var userId = $stateParams.userId;

        getUserDetailsById();
        function loadAddressForm(address){
            console.log("address to modal");
            console.log(address)
            $uibModal.open({
                templateUrl: 'app/partials/address-form.html',
                controller: function ($uibModalInstance) {

                    var vm1 = this;
                    vm1.selectTypes = ["Home","Work"];
                    if(address == undefined || address == null)
                        vm1.address = {};
                    else
                        vm1.address = address;
                    vm1.saveAddressModal = saveAddressModal;
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
            userFactory.saveAddress(address,vm.user._id).then(function(response){
                    if(response.status == "ok"){
                        loadAddressTable();
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


                            vm.addressNewEntry = false;
                            loadAddressTable();


                        }
                        else {

                            console.log(vm.selectTypes);
                            vm.addressNewEntry = true;
                        }

                    }
                    else{
                        console.log("no data found");

                    }
                },
                function(data){

                });
        }
        function getUserAddress(){

            userFactory.getUserAddress(userId).then(function(response){

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

            userFactory.deleteAddress(userId,address).then(function(response){

                    if(response.status == "ok"){
                        loadAddressTable();

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
                count: 2
            }, {
                total : vm.userAddress.length,
                getData: function (params) {

                    params.total(vm.userAddress.length);

                    var query = {};
                    query.userId = userId;
                    query.sortingCriteria = params.sorting();
                    return   userFactory.getUserAddress(query).then(function(response){

                            if(response.status == "ok"){
                                vm.userAddress = response.data.address;

                                var filterObj = params.filter(),filteredData = $filter('filter')(vm.userAddress, filterObj);

                                // Then we sort the FILTERED DATA ARRAY
                                // NOTICE that the first parameter provided to $filter('orderBy')
                                // is the filtered array <filteredData> and not the original
                                // data array.
                                //console.log(filteredData);
                                var sortObj = params.sorting(), orderedData = $filter('orderBy')(filteredData, filterObj);
                                vm.data = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                                return vm.data;
                            }
                            else{
                                console.log("no data found");
                            }
                        },
                        function(data){
                            console.log(data);
                        });
                }
            });
        }
    }
})();