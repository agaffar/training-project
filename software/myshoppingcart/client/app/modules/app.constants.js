/**
 * Created by SB004 on 3/15/2017.
 */
(function(){
    'use strict'
    angular.module('myApp').constant('Regexes',{
        regEmail : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        stringRegex : /^[A-z]+$/,
        regexPasswd : "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})"
    });
})();