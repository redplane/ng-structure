module.exports = (ngModule) => {
    return ngModule.controller('loginController', ($scope, $timeout) => {

        const {LoginViewModel} = require('../../../view-models/login.view-model.ts');

        //#region Properties

        // Constants reflection.
        $scope.urlStatesConstant = require('../../../constants/url-states.constant.ts').UrlStatesConstant;

        /*
        * Model which contains information for signing into system.
        * */
        $scope.loginModel = new LoginViewModel();

        //#endregion

        //#region Methods

        $timeout(() => {
            let controllers = ngModule._invokeQueue.filter((el) => {
                return el[0] === "$controllerProvider";
            }).map(function (el) {
                return el[2]["0"];
            });

            for (let controller of controllers){
                console.log(controller);
            }
        });

        //#endregion
    });
};