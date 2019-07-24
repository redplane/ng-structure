import {IController, IPromise} from "angular";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {IModalService} from "angular-ui-bootstrap";
import {UiService} from "../../../services/implementations/ui.service";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {LoadStatesViewModel} from "../../../view-models/state/load-states.view-model";
import {IStateService} from "../../../services/interfaces/state-service.interface";
import {EditStateViewModel} from "../../../view-models/state/edit-state.view-model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {ICityMasterPageScope} from "./city-master-page.scope";
import {CityViewModel} from "../../../view-models/city/city.view-model";
import {ICityService} from "../../../services/interfaces/city-service.interface";
import {AddCityViewModel} from "../../../view-models/city/add-city.view-model";
import {LoadCitiesViewModel} from "../../../view-models/city/load-cities.view-model";

/* @ngInject */
export class CityMasterPageController implements IController {

    //#region Properties


    //#endregion

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: ICityMasterPageScope,
                       protected $uibModal: IModalService,
                       protected $ui: UiService,
                       protected $states: IStateService,
                       protected $cities: ICityService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $translate: angular.translate.ITranslateService) {

        // Properties binding.
        this.$scope.loadCitiesResult = new SearchResultViewModel<CityViewModel>();

        const loadCitiesModel = new LoadStatesViewModel();
        loadCitiesModel.pager = new PagerViewModel();
        loadCitiesModel.pager.page = 1;
        loadCitiesModel.pager.records = ValidationValueConstant.maxRecordsPerSearchPage;
        this.$scope.loadCitiesConditions = loadCitiesModel;

        // Methods binding.
        this.$scope.shouldCitiesDisplayed = this.shouldStatesDisplayed;
        this.$scope.shouldControlsAvailable = this.shouldControlsAvailable;
        this.$scope.ngOnCityMasterPageLoaded = this.ngOnCityMasterPageLoaded;
        this.$scope.clickAddCity = this.clickAddCity;
        this.$scope.clickDeleteCity = this.clickDeleteCity;
        this.$scope.clickEditCity = this.clickEditState;
        this.$scope.clickOpenCitiesFinderModal = this._clickOpenCitiesFinderModal;

        this.$scope.masterItemAvailabilities = MasterItemAvailabilities;
    }

    //#endregion

    //#region Methods

    protected shouldStatesDisplayed = (): boolean => {
        const loadStatesResult = this.$scope.loadCitiesResult;
        return loadStatesResult && loadStatesResult.items && (loadStatesResult.items.length > 0);
    };

    protected shouldControlsAvailable = (): boolean => {
        return this.$scope.loadCities;
    };

    protected ngOnCityMasterPageLoaded = (): void => {

        this.$scope.loadCities = true;

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$cities
            .loadCitiesAsync(this.$scope.loadCitiesConditions)
            .then((loadStatesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.loadCitiesResult = loadStatesResult;
            })
            .finally(() => {
                this.$scope.loadCities = false;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    /*
    * Called when add faq is clicked.
    * */
    protected clickAddCity = (): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'cityDetail',
                size: 'lg',
                backdrop: 'static'
            }).result;

        modalResult
            .then((model: AddCityViewModel) => {
                // Display loading ui.
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$cities.addCityAsync(model);
            })
            .then(() => {
                const message = this.$translate.instant('MSG_ADDED_CITY_SUCCESSFULLY');

                // Reload faqs.
                return this.loadCitiesAsync(this.$scope.loadCitiesConditions);
            })
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.loadCitiesResult = loadCitiesResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected clickDeleteCity = (stateId: string): void => {

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$states.deleteStateAsync(stateId)
            .then(() => {
                // Reload faqs.
                return this.loadCitiesAsync(this.$scope.loadCitiesConditions);
            })
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.loadCitiesResult = loadCitiesResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected clickEditState = (city: CityViewModel): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'cityDetail',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    city: () => {
                        return {
                            ...city
                        };
                    }
                }
            }).result;

        modalResult
            .then((model: EditStateViewModel) => {
                // Display loading ui.
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$states.editStateAsync(model.id, model);
            })
            .then(() => {
                const message = this.$translate.instant('MSG_ADDED_CITY_SUCCESSFULLY');

                // Reload faqs.
                return this.loadCitiesAsync(this.$scope.loadCitiesConditions);
            })
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.loadCitiesResult = loadCitiesResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickOpenCitiesFinderModal = (): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'cityFilter',
                size: 'md',
                backdrop: 'static'
            }).result;

    };

    protected loadCitiesAsync = (conditions: LoadCitiesViewModel): IPromise<SearchResultViewModel<CityViewModel>> => {
        return this.$cities
            .loadCitiesAsync(conditions);
    };

    //#endregion
}
