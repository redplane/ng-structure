import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";
import {DetailedFoodModule} from "./detailed-food";

/* @ngInject */
export class FoodModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        new DetailedFoodModule($stateProvider);

        $stateProvider
            .state(UrlStatesConstant.foodManagementModuleName, {
                url: UrlStatesConstant.foodManagementModuleUrl,
                controller: ControllerNamesConstant.foodManagementControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./food-management.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadController:  ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                require('../shared/message-modal');

                                // load only controller module
                                let ngModule = module('app.phrase', ['ngMessageModalModule']);
                                const {FoodManagementController} = require('./food-management.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.foodManagementControllerName, FoodManagementController);
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
