module.exports = function (ngModule) {
    ngModule.controller('loginController', function ($scope, urlStates) {

        //#region Properties

        // Constants reflection.
        $scope.urlStates = urlStates;

        //#endregion
    });
};