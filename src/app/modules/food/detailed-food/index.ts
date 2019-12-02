/* @ngInject */
import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {ControllerNamesConstant} from "../../../constants/controller-names.constant";
import {IPromise, IQService} from "angular";
import {ILazyLoad} from "oclazyload";
import {module} from 'angular';
import {DetailedFoodController} from "./detailed-food.controller";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {LoadFoodViewModel} from "../../../view-models/food/load-food.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {DetailedFoodStateParams} from "../../../models/route-params/detailed-food.state-params";
import {IFoodService} from "../../../services/interfaces/foods-service.interface";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";

export class DetailedFoodModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.addFoodModuleName, {
                url: UrlStatesConstant.addFoodModuleUrl,
                controller: ControllerNamesConstant.detailedFoodControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => {
                            require('./detailed-food.scss');
                            resolve(require('./detailed-food.html'));
                        });
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                require('../../shared/message-modal');
                                require('../../shared/location-picker-modal');
                                require('../food-type-picker-modal');
                                require('../../shared/datetime-picker-modal');
                                require('../../shared/photo-cropper-modal');

                                let ngModule = module('app.phrase', ['ngMessageModalModule',
                                    'ngLocationPickerModalModule', 'ngFoodTypePickerModalModule', 'ngDateTimePickerModalModule',
                                'ngPhotoCropperModule']);
                                const {DetailedFoodController} = require('./detailed-food.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.detailedFoodControllerName, DetailedFoodController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            })
                        });
                    }],

                    detailedFood: () => null
                }
            });

        $stateProvider
            .state(UrlStatesConstant.editFoodModuleName, {
                url: UrlStatesConstant.editFoodModuleUrl,
                controller: ControllerNamesConstant.detailedFoodControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => {
                            require('./detailed-food.scss');
                            resolve(require('./detailed-food.html'));
                        });
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                require('../../shared/message-modal');
                                require('../../shared/location-picker-modal');
                                require('../food-type-picker-modal');
                                require('../../shared/datetime-picker-modal');
                                require('../../shared/photo-cropper-modal');

                                let ngModule = module('app.phrase', ['ngMessageModalModule',
                                    'ngLocationPickerModalModule', 'ngFoodTypePickerModalModule', 'ngDateTimePickerModalModule',
                                    'ngPhotoCropperModule']);
                                const {DetailedFoodController} = require('./detailed-food.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.detailedFoodControllerName, DetailedFoodController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            })
                        });
                    }],

                    detailedFood: ['$q', '$ocLazyLoad',
                        '$stateParams', '$foods', ($q: IQService,
                                                   $ocLazyLoad: ILazyLoad,
                                                   $stateParams: DetailedFoodStateParams,
                                                   $foods: IFoodService): IPromise<FoodViewModel> => {

                            const loadFoodsCondition = new LoadFoodViewModel();
                            loadFoodsCondition.ids = [$stateParams.foodId];
                            loadFoodsCondition.pager = new PagerViewModel(1, 1);

                            return $foods.loadFoodsAsync(loadFoodsCondition)
                                .then((loadFoodsResult: SearchResultViewModel<FoodViewModel>) => {
                                    if (!loadFoodsResult || !loadFoodsResult.items) {
                                        return null;
                                    }

                                    const foods = loadFoodsResult.items;
                                    if (!foods || !foods.length) {
                                        return null;
                                    }

                                    return foods[0];
                                });
                        }]
                }
            });

    }

    //#endregion
}
