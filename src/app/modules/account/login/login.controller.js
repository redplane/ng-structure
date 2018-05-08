module.exports = (ngModule) => {
    ngModule.controller('loginController', ($scope, urlStatesConstant) => {

        //#region Properties

        // Constants reflection.
        $scope.urlStatesConstant = urlStatesConstant;

        //#endregion
    });
};