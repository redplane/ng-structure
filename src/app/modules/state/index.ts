import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";

/* @ngInject */
export class StateModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.stateMasterPageModuleName, {
                url: UrlStatesConstant.stateMasterPageModuleUrl,
                controller: ControllerNamesConstant.stateMasterPageControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./master-page/state-master-page.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadFaqMasterPageController:  ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                // load only controller module
                                let ngModule = module('app.states-master-page', []);
                                const {StateMasterPageController} = require('./master-page/state-master-page.controller.ts');

                                // // Lazy load faq detail.
                                const {StateDetailDirective} = require('./state-detail');
                                const {StateDetailController} = require('./state-detail/state-detail.controller');
                                ngModule = ngModule.directive('stateDetail',
                                    ($q: IQService, $compile: ICompileService) => new StateDetailDirective($q, $compile));

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.stateMasterPageControllerName, StateMasterPageController);
                                ngModule.controller(ControllerNamesConstant.stateDetailControllerName, StateDetailController);
                                $ocLazyLoad.inject( ngModule.name);
                                resolve(ngModule.controller);
                            })
                        });
                    }]
                }
            });

    }

    //#endregion
}
