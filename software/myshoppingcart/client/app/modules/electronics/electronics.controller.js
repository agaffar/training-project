/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('electronics').controller('electronicHomeController',electronic);
    electronic.$inject = ['$http'];
    function electronic($http)
    {
        var vm = this;
        vm.message = "getting electronics json"
        $http({
            method : "GET",
            url : "dataset.json"
        }).then(function mySucces(response) {
            vm.message = response.data.electronics;
            vm.eachElect = vm.message;

        }, function myError(response) {
            vm.message = response.statusText;
        });
    }
})();