import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {module} from 'angular';

export class UnauthorizedLayoutModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.unauthorizedLayoutModuleName, {
                abstract: true,
                controller: 'unauthorizedLayoutController',
                templateProvider: ['$q', ($q) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./unauthorized-layout.html')));
                    });
                }],
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadLoginController: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('shared.unauthorized-layout', []);
                                const {UnauthorizedLayoutController} = require('./unauthorized-layout.controller');
                                // Import controller file.
                                ngModule.controller('unauthorizedLayoutController', UnauthorizedLayoutController);
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