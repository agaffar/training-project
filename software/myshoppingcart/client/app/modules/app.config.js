/**
 * Created by Lenovo on 1/17/2017.
 */
(function(){
    angular.module('myApp').config(navConfig);
    navConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function navConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {

        console.log("uuuuuuuuuuu");
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
        $urlRouterProvider.otherwise('home');
        //$locationProvider.html5Mode(true);
    }
})();

