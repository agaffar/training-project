(function()
{
    'use strict'
    angular.module("myApp").run(myAppRun);

    myAppRun.$inject = ['appFactory','$rootScope'];
    function myAppRun(appFactory,$rootScope)
    {
        console.log("in my app run");
        $rootScope.min  = 3000;
        $rootScope.max = 30000;
        appFactory.getJData().then(function(response)
        {
            console.log("in app run");
            console.log(response);
            $rootScope.products = [];
            $rootScope.products = response;
            //vm.products =
            //console.log(vm.products);
        },function(data)
        {
            //console.log(response);

            //console.log(vm.products);
        });
    }

})();