/**
 * Created by SB004 on 3/8/2017.
 */
(function(){
    'use strict';

    angular.module('myApp')

        .factory('api', api);

    api.$inject = ['$resource','$rootScope'];

    //clinical trail API for data calls
    function api ($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }

    //default parameters will go here..
    var getParamDefaults = function() {
        return {
            id:'@id'
        };
    };

    //default actions and methods will go here..
    /*
     router.get('/users/login/', users.checkNLogin);
     router.get('/users/getUser', users.getUser);
     router.get('/users/forgotPassword', users.forgotPasswordSendLink);
     router.put('/users/resetpassword', users.resetPassword);
     router.delete('/users/logout', users.checkLogout);

     */
    var getActions = function() {
        return {
            'checkEmailExist':{
                method : 'GET',
                url: '/api/users/register/checkemail'
            },
            'createUser':{
                method : 'POST',
                url: '/api/users/register/createUser'
            },
            'confirmRegistration':{
                method : 'POST',
                url: '/api/users/register/confirmregistration'
            },
            'getUser':{
                method : 'GET',
                url: '/api/users/getUser'
            },

            'checkNlogin':{
                method : 'GET',
                url: '/api/users/login/'
            },
            'logout':{
                method : 'DELETE',
                url: '/api/users/logout'
            },
            'forgotPassword':{
                method : 'POST',
                url: '/api/users/forgotPassword'
            },
            'resetPassword':{
                method : 'PUT',
                url: '/api/users/resetpassword'
            },
            /*
             router.get('/api/products', productsList.topRatedProducts);
             router.get('/api/products/search', productsList.searchProducts);
             router.get('/api/products/category', productsList.productsByCategory);
             router.get('/api/products/brands', productsList.getAllBrandsByType);
             //router.get('/api/products/offers', productsList.getAllOffersType);
             router.get('/api/products/viewproduct', productsList.getProduct);
             router.get('/api/products/viewproduct/similarProducts', productsList.getSimilarProducts);
             */
            'topRatedProducts':{
                method : 'GET',
                url: '/api/products/topRatedProducts'
            },
            'searchProducts':{
                method : 'GET',
                url: '/api/products/search'
            },
            'productsByCategory':{
                method : 'GET',
                url: '/api/products/category'
            },
            'getAllBrandsByType':{
                method : 'GET',
                url: '/api/products/brands'
            },
            'getProduct':{
                method : 'GET',
                url: '/api/products/viewproduct'
            },
            'getSimilarProducts':{
                method : 'GET',
                url: '/api/products/viewproduct/similarProducts'
            },
            'getUserData':{
                method : 'GET',
                url: '/api/users/user/getProfile'
            },
            'saveUserData':{
                method : 'PUT',
                url: '/api/users/user/saveProfiles'
            },
            'getUserAddress':{
                method : 'GET',
                url: '/api/users/user/getAddress'
            },
            'SaveAddress':{
                method : 'POST',
                url: '/api/users/user/saveAddress'
            },
            'deleteAddress' : {
                method : 'DELETE',
                url: '/api/users/user/deleteAddress'
            }
        }
    }
}());
