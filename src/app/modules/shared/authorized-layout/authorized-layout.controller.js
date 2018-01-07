module.exports = function (ngModule) {
    ngModule.controller('authorizedLayoutController',
        function ($scope, $transitions, uiService) {

            //#region Methods

            /*
            * Callback which is called when component starts being initiated.
            * */
            $scope.init = function () {
                uiService.reloadWindowSize();
            };

            /*
            * Hook the transition from state to state.
            * */
            $transitions.onSuccess({}, function (transition) {
                uiService.reloadWindowSize();
            });
            //#endregion
        });
};