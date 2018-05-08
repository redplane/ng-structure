module.exports = (ngModule) => {
    ngModule.controller('mainDashboardController', ($scope, toastr) => {

        //#region Properties

        $scope.model = {
            date: null
        };

        //#endregion

        //#region Methods

        $scope.init = function () {
            toastr.success('Main dashboard has been initiated.');
        };

        //#endregion
    });
};