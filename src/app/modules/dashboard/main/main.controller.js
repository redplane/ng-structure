/*
* Module exports.
* */
module.exports = function(ngModule){
    ngModule.controller('mainDashboardController', function($scope, toastr, validationService){

        // Service reflection.
        $scope.validationService = validationService;

        $scope.model = {
            date: null
        };

        $scope.init = function(){
            toastr.success('Main dashboard has been initiated.');
        };
    });
};