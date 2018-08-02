module.exports = (ngModule) => {
    ngModule.config(($stateProvider, urlStatesConstant) => {

        let urlStateDashboard = urlStatesConstant.dashboard;
        let urlStateAuthorizedLayout = urlStatesConstant.authorizedLayout;

        $stateProvider.state(urlStateDashboard.name, {
            url: urlStateDashboard.url,
            controller: 'mainDashboardController',
            parent: urlStateAuthorizedLayout.name,
            templateProvider: ['$q', ($q) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./main.html')));
                });
            }],
            resolve: {
                loadMainDashboardController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load only controller module
                            let module = angular.module('dashboard.main', []);
                            require('./main.controller')(module);
                            $ocLazyLoad.load({name: module.name});
                            resolve(module.controller);
                        })
                    });
                }
            }
        });
    });
};