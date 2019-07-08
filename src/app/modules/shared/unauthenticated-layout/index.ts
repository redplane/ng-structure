import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";

/* @ngInject */
export class UnauthenticatedLayoutModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        const unauthenticatedLayoutControllerName = 'unauthenticatedLayoutController';

        $stateProvider
            .state(UrlStatesConstant.unauthenticatedLayoutModuleName, {
                abstract: true,
                controller: unauthenticatedLayoutControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./unauthenticated-layout.html')));
                    });
                }],
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('shared.unauthenticated-layout', []);

                                const {UnauthenticatedLayoutController} = require('./unauthenticated-layout.controller');

                                // Import controller file.
                                ngModule.controller(unauthenticatedLayoutControllerName, UnauthenticatedLayoutController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }]
                }
            });

    }

    //#endregion
}
