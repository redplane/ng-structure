module.exports = (ngModule) => {

    //#region Module configs.

    /*
    * Module configuration.
    * */
    ngModule.config(($stateProvider, urlStatesConstant) => {
        $stateProvider.state(urlStatesConstant.login.name, {
            url: urlStatesConstant.login.url,
            controller: 'loginController',
            templateProvider: ['$q', ($q) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./login.html')));
                });
            }],
            parent: urlStatesConstant.unauthorizedLayout.name,
            resolve: {
                /*
                * Load login controller.
                * */
                loadLoginController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('account.login', []);
                            require('./login.controller')(module);
                            $ocLazyLoad.load({name: module.name});
                            resolve(module.controller);
                        })
                    });
                }
            }
        })
    });

    //#endregion
};