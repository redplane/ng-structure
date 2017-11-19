/*
* Module exports.
* */
module.exports = function(ngModule){
    ngModule.controller('mainDashboardController', function($scope, toastr){

        $scope.init = function(){
            toastr.success('Main dashboard has been initiated.');
        };
    });
};