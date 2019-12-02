import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";

/* @ngInject */
export class CityModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.cityMasterPageModuleName, {
                url: UrlStatesConstant.cityMasterPageModuleUrl,
                controller: ControllerNamesConstant.cityMasterPageControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./city-management.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadCityMasterPageController:  ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                // load only controller module
                                let ngModule = module('app.city', ['ngDetailedCityModalModule']);
                                const {CityManagementController} = require('./city-management.controller');

                                // // Lazy load faq detail.
                                require('./detailed-city-modal');
                                const {CityFilterDirective} = require('./city-filter');


                                ngModule = ngModule.directive('cityFilter',
                                    ($q: IQService, $compile: ICompileService) => new CityFilterDirective($q, $compile));

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.cityMasterPageControllerName, CityManagementController);
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
