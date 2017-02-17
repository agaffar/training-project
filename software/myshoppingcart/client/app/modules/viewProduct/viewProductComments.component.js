/**
 * Created by Lenovo on 2/1/2017.
 */
(function(){
    angular.module('viewProduct').component('productComments',{
        bindings :{
           allComments : '='
        },
        templateUrl :'app/partials/comments.html',
        controller : commentsControl,
        controllerAs : 'comm'
    });
    commentsControl.$inject = ['$scope'];
    function commentsControl($scope)
    {
        var vm = this;
        vm.limit = 1;
        vm.changeLimit = changeLimit;
        function changeLimit(){
            //console.log(vm.limit)
            if(vm.limit == 1 )
            vm.limit = vm.allComments.length;
            else
            vm.limit = 1;
        }
    }
})();