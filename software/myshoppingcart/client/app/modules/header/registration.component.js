/**
 * Created by SB004 on 3/6/2017.
 */
(function(){
    'use strict'
    angular.module('myApp.header').component('registerForm',{
        bindings:{
            value : '@'

        },
        templateUrl:"app/partials/registrationform.html",
        controller: regFormCtrl,
        controllerAs:"regForm"
    })
    regFormCtrl.$inject=['$scope','headerFactory'];
    function regFormCtrl($scope,headerFactory)
    {
        console.log("in registration controller component")
    }


})();