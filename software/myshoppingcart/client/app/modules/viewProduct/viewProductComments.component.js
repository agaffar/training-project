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

    }
})();