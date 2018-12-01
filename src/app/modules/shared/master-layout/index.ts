import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";

/* @ngInject */
export class MasterLayoutModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.masterLayout, {
                abstract: true,
                controller: 'masterLayoutController',
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./master-layout.html')));
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
                                let ngModule = module('shared.master-layout', []);
                                const {MasterLayoutController} = require('./master-layout.controller');
                                // Import controller file.
                                ngModule.controller('masterLayoutController', MasterLayoutController);
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