module.exports = function (ngModule) {
    ngModule.controller('authorizedLayoutController',
        function ($scope, $transitions, $window) {

        //#region Methods

            // Classes which are for applying to
            var classes = ['skin-black', 'hold-transition', 'fixed', 'sidebar-mini', 'sidebar-collapse'];

            // Callback which is fired when ui transition has been done successfully.
            $transitions.onSuccess({}, function(transition){

                debugger;
            });

        /*
        * Callback which is called when component starts being initiated.
        * */
        $scope.init = function () {
        };

        //#endregion
    });
};