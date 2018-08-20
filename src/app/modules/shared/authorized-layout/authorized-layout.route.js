module.exports = (ngModule) => {
    // Route config.
    ngModule.config(($stateProvider) => {

        // Constants reflection.
        const UrlStatesConstant = require('../../../constants/url-states.constant.ts').UrlStatesConstant;

        // State configuration
        $stateProvider.state(UrlStatesConstant.authorizedLayoutModuleName, {
            controller: 'authorizedLayoutController',
            abstract: true,
            templateProvider: ['$q', ($q) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./authorized-layout.html')));
                });
            }],
            resolve: {
                /*
                * Load login controller.
                * */
                loadAuthorizedLayoutController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('shared.authorize-layout', []);
                            require('./authorized-layout.controller')(module);
                            $ocLazyLoad.load({name: module.name});
                            resolve(module.controller);
                        })
                    });
                }
            },
            params: {
                cssClassNames: ['hold-transition', 'skin-black', 'fixed', 'sidebar-mini']
            }
        });
    });
};