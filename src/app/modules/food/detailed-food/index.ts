import {StateProvider} from "@uirouter/angularjs";
import {IPromise, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {ControllerNamesConstant} from "../../../constants/controller-names.constant";
import {IFoodService} from "../../../services/interfaces/foods-service.interface";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {DetailedFoodStateParams} from "../../../models/route-params/detailed-food.state-params";
import {LoadFoodViewModel} from "../../../view-models/food/load-food.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";

/* @ngInject */
export class DetailedFoodModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.detailedFoodModuleName, {
                url: UrlStatesConstant.detailedFoodModuleUrl,
                controller: ControllerNamesConstant.detailedFoodControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./detailed-food.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {

                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                require('../shared/message-modal');

                                // load only controller module
                                let ngModule = module('app.phrase', ['ngMessageModalModule']);
                                const {DetailedFoodController} = require('./detailed-food.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.detailedFoodControllerName, DetailedFoodController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            })
                        });
                    }],

                    detailedFood: ['$stateParams', '$foods', ($stateParams: DetailedFoodStateParams,
                                                              $foods: IFoodService): IPromise<FoodViewModel> => {
                        const loadFoodConditions = new LoadFoodViewModel();
                        loadFoodConditions.ids = [$stateParams.id];
                        loadFoodConditions.pager = new PagerViewModel(1, 1);
                        return $foods
                            .loadFoodsAsync(loadFoodConditions)
                            .then((loadFoodsResult: SearchResultViewModel<FoodViewModel>) => {
                                if (!loadFoodsResult || !loadFoodsResult.items) {
                                    return null;
                                }

                                return loadFoodsResult.items[0];
                            });
                    }]
                }
            });

    }

    //#endregion
}
