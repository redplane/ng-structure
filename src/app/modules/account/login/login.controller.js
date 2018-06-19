module.exports = (ngModule) => {
    return ngModule.controller('loginController', ($scope, $timeout,
                                                   urlStatesConstant) => {

        //#region Properties

        // Constants reflection.
        $scope.urlStatesConstant = urlStatesConstant;

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