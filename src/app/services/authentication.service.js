module.exports = function (ngModule) {
    ngModule.service('authenticationService',
        function ($window, appSettings) {

            /*
            * Getting authentication token from localStorage.
            * */
            this.getAuthenticationToken = function () {
                return $window.localStorage.getItem(appSettings.identityStorage);
            };

            /*
            * Initiate authentication token into local storage.
            * */
            this.initAuthenticationToken = function (accessToken) {
                $window.localStorage.setItem(appSettings.identityStorage, accessToken);
            };

            /*
            * Remove authentication token from localStorage.
            * */
            this.clearAuthenticationToken = function () {
                $window.localStorage.removeItem(appSettings.identityStorage);
            };
        });
};