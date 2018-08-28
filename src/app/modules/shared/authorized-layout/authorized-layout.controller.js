module.exports = (ngModule) => {

    // Import constants.
    const UrlStatesConstant = require('../../../constants/url-states.constant').UrlStatesConstant;
    ngModule.controller('authorizedLayoutController', (
        $state,
        $ui,
        $scope) => {

        //#region Properties

        //#endregion

        //#region Methods

        /*
        * Called when sign out is clicked.
        * */
        $scope._ngOnSignOutClicked = () => {
            $state.go(UrlStatesConstant.loginModuleName);
        }

        //#endregion
    });
};