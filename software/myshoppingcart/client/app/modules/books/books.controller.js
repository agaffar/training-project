/**
 * Created by Lenovo on 2/6/2017.
 */
(function(){
    'use strict'
    angular.module('books').controller('booksController',bookController);
    function bookController()
    {
        console.log("in book controller");
    }
})();