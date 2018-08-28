module.exports = (ngModule) => {
    ngModule.controller('authorizedLayoutController',
        ($scope, $transitions, $ui) => {

            //#region Methods

            /*
            * Callback which is called when component starts being initiated.
            * */
            $scope.init = function () {
                $ui.alert('Init');
            };

            //#endregion
        });
};