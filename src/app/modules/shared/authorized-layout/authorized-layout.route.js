module.exports = (ngModule) => {
    // Route config.
    ngModule.config(($stateProvider) => {

        // Import constants
        const UrlStatesConstant = require('../../../constants/url-states.constant').UrlStatesConstant;

        // State configuration
        $stateProvider.state(UrlStatesConstant.authorizeLayoutModuleName, {
            templateProvider: ['$q', ($q) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./authorized-layout.html')));
                });
            }],
            controller: 'authorizedLayoutController',
            abstract: true,
            resolve:{

                // Load authorized layout controller
                loadAuthorizedLayoutController: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('shared.authorized-layout', []);
                            require('./authorized-layout.controller')(module);
                            $ocLazyLoad.load({name: module.name});
                            resolve(module.controller);
                        })
                    });
                }]
            }
        });
    });
};