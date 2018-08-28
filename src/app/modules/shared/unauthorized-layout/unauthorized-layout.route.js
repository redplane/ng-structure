module.exports = (ngModule) => {

    // Import constants
    const UrlStatesConstant = require('../../../constants/url-states.constant').UrlStatesConstant;

    // Route config.
    ngModule.config(($stateProvider) => {
        $stateProvider.state(UrlStatesConstant.unauthorizedLayoutModuleName, {
            controller: 'unauthorizedLayoutController',
            abstract: true,
            templateProvider: ['$q', ($q) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./unauthorized-layout.html')));
                });
            }],
            resolve: {

                // Load authorized layout controller
                loadUnauthorizedLayoutController: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('shared.unauthorized-layout', []);
                            require('./unauthorized-layout.controller')(module);
                            $ocLazyLoad.load({name: module.name});
                            resolve(module.controller);
                        })
                    });
                }]
            }
        })
    });
};