import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";

/* @ngInject */
export class MasterLayoutModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.authorizeLayoutModuleName, {
                abstract: true,
                controller: 'authorizedLayoutController',
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./master-layout.html')));
                    });
                }],
                parent: UrlStatesConstant.unauthorizedLayoutModuleName,
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadLoginController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('shared.master-layout', []);
                                const {MasterLayoutController} = require('./master-layout.controller.ts');
                                // Import controller file.
                                ngModule.controller('authorizedLayoutController', MasterLayoutController);
                                $ocLazyLoad.load(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }]
                }
            });

    }

    //#endregion
}