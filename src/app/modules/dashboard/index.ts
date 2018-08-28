import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {module} from 'angular';

/* @ngInject */
export class DashboardModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.dashboardModuleName, {
                url: UrlStatesConstant.dashboardModuleUrl,
                controller: 'dashboardController',
                templateProvider: ['$q', ($q) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./dashboard.html')));
                    });
                }],
                parent: UrlStatesConstant.authorizeLayoutModuleName,
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadDashboardController:  ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('account.login', []);
                                const {DashboardController} = require('./dashboard.controller.ts');
                                // Import controller file.
                                ngModule.controller('dashboardController', DashboardController);
                                $ocLazyLoad.load({name: ngModule.name});
                                resolve(ngModule.controller);
                            })
                        });
                    }]
                }
            });

    }

    //#endregion
}