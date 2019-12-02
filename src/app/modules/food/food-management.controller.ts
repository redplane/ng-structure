import {IController, IPromise, IQService} from "angular";
import {IFoodManagementScope} from "./food-management.scope";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {LoadFoodViewModel} from "../../view-models/food/load-food.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {IFoodService} from "../../services/interfaces/foods-service.interface";
import {ValidationValueConstant} from "../../constants/validation-value.constant";
import {PagerViewModel} from "../../view-models/pager.view-model";
import { StateService } from "@uirouter/angularjs";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {DetailedFoodStateParams} from "../../models/route-params/detailed-food.state-params";
import {PromotionViewModel} from "../../view-models/promotion.view-model";

export class FoodManagementController implements IController {

    //#region Constructor

    public constructor(protected $scope: IFoodManagementScope,
                       protected $foods: IFoodService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $state: StateService,
                       protected $q: IQService) {

        $scope.loadFoodsCondition = new LoadFoodViewModel();
        $scope.loadFoodsCondition.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);

        $scope.loadFoodsResult = new SearchResultViewModel<FoodViewModel>();
        $scope.masterItemAvailabilities = MasterItemAvailabilities;

        $scope.shouldFoodsDisplayed = this._shouldFoodsDisplayed;
        $scope.clickReloadFoods = this._clickReloadFoods;
        $scope.clickEditFood = this._clickEditFood;
        $scope.clickAddFood = this._clickAddFood;
        $scope.shouldPromotionValid = $foods.shouldPromotionValid;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadFoods();
    }

    //#endregion

    //#region Internal methods

    protected _shouldFoodsDisplayed = (): boolean => {
        const loadItemsResult = this.$scope.loadFoodsResult;
        if (!loadItemsResult) {
            return false;
        }

        const items = loadItemsResult.items;
        return (items && items.length > 0);
    };

    protected _clickReloadFoods = (page?: number): void => {

        if (page > 0) {
            this.$scope.loadFoodsCondition.pager.page = page;
        }

        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this._loadFoodsAsync(this.$scope.loadFoodsCondition)
            .then((loadFoodsResult: SearchResultViewModel<FoodViewModel>) => {
                this.$scope.loadFoodsResult = loadFoodsResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickEditFood = (foodId: string): void => {

        // Display loading screen.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$state
            .go(UrlStatesConstant.editFoodModuleName, new DetailedFoodStateParams(foodId))
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickAddFood = (): void => {
        // Display loading screen.
        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$state
            .go(UrlStatesConstant.addFoodModuleName)
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            })
    };

    protected _loadFoodsAsync = (condition: LoadFoodViewModel): IPromise<SearchResultViewModel<FoodViewModel>> => {
        this.$scope.loadingFoods = true;
        return this.$foods
            .loadFoodsAsync(condition)
            .finally(() => {
                this.$scope.loadingFoods = false;
            });
    };

    //#endregion
}
