/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp').config(navConfig);
    navConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function navConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {

        //console.log("uuuuuuuuuuu");
        $stateProvider.state('home', {
            url:"/home",
            controller: 'homeController',
            controllerAs: 'hc',
            templateUrl: '/app/partials/home.html'

        });
        $stateProvider.state('electronics', {
            url:"/electronics/:type",
            controller: 'electronicHomeController',
            controllerAs: 'ec',
            templateUrl: '/app/partials/electronicGoods.html'

        });
        $stateProvider.state('books', {
            url:"/books/:type",
            controller: 'booksController',
            controllerAs: 'bc',
            templateUrl: '/app/partials/books.html'

        });
        $stateProvider.state('product', {
            url:"/id?id",
            controller: 'viewProductController',
            controllerAs: 'vpc',
            templateUrl: '/app/partials/viewProduct.html'

        });
        $stateProvider.state('confirmRegistration', {
            url:"/confirmregistration/:token",
            controller: 'registerController',
            controllerAs: 'rgc',
            templateUrl: '/app/partials/confirm-registration.html'

        });
        $stateProvider.state('resetPassword', {
            url:"/resetPassword/:token",
            controller: 'resetPasswordController',
            controllerAs: 'repc',
            templateUrl: '/app/partials/reset-password.html'

        });
        $stateProvider.state('profile', {
            url:"/userProfile/:authtokenId",
            controller: 'userProfileController',
            controllerAs: 'upc',
            templateUrl: '/app/partials/profile.html'

        });
        $urlRouterProvider.otherwise('home');
        //$locationProvider.html5Mode(true);
    }
})();

