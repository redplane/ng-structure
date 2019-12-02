import {IController, IPromise, IQService} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {PagerViewModel} from "../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";
import {IModalService} from "angular-ui-bootstrap";
import {UiService} from "../../services/implementations/ui.service";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {LoadStatesViewModel} from "../../view-models/states/load-states.view-model";
import {IStatesService} from "../../services/interfaces/states-service.interface";
import {EditStateViewModel} from "../../view-models/states/edit-state.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {ICityManagementScope} from "./city-management.scope";
import {CityViewModel} from "../../view-models/city/city.view-model";
import {ICitiesService} from "../../services/interfaces/cities-service.interface";
import {AddCityViewModel} from "../../view-models/city/add-city.view-model";
import {LoadCitiesViewModel} from "../../view-models/city/load-cities.view-model";
import {StateViewModel} from "../../view-models/states/state-view.model";
import {ICityDetailResolver} from "../../interfaces/resolvers/city-detail.resolver";
import {DetailedCityModalService} from "./detailed-city-modal/detailed-city-modal.service";
import {EditCityViewModel} from "../../view-models/city/edit-city.view-model";

/* @ngInject */
export class CityManagementController implements IController {

    //#region Properties


    //#endregion

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: ICityManagementScope,
                       protected $uibModal: IModalService,
                       protected $ui: UiService,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $detailedCityModals: DetailedCityModalService,
                       protected $q: IQService) {

        // Properties binding.
        this.$scope.loadCitiesResult = new SearchResultViewModel<CityViewModel>();

        const loadCitiesModel = new LoadCitiesViewModel();
        loadCitiesModel.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
        this.$scope.loadCitiesConditions = loadCitiesModel;

        // Methods binding.
        this.$scope.shouldCitiesDisplayed = this.shouldStatesDisplayed;
        this.$scope.shouldControlsAvailable = this.shouldControlsAvailable;
        this.$scope.clickAddCity = this.clickAddCity;
        this.$scope.clickDeleteCity = this.clickDeleteCity;
        this.$scope.clickEditCity = this.clickEditCity;
        this.$scope.clickOpenCitiesFinderModal = this.clickOpenCitiesFinderModal;
        this.$scope.clickReloadCities = this.clickReloadCities;

        this.$scope.masterItemAvailabilities = MasterItemAvailabilities;
    }

    //#endregion

    //#region Methods

    /*
    * Called when controller is initialized.
    * */
    public $onInit(): void {
        this.$scope.loadCities = true;

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        // Load all states asynchronously.
        const loadStatesTask = this.$states.loadWholeStatesAsync();

        // Load cities using specific conditions.
        const loadCitiesTask = this.$cities
            .loadCitiesAsync(this.$scope.loadCitiesConditions);

        this.$q
            .all([loadStatesTask, loadCitiesTask])
            .then(loadItemsResults => {

                const idToState: { [id: string]: StateViewModel } = {};
                for (const state of loadItemsResults[0]) {
                    idToState[state.id] = state;
                }
                this.$scope.states = loadItemsResults[0];
                this.$scope.idToState = idToState;
                this.$scope.loadCitiesResult = loadItemsResults[1];
            })
            .finally(() => {
                this.$scope.loadCities = false;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            })

    }

    protected shouldStatesDisplayed = (): boolean => {
        const loadStatesResult = this.$scope.loadCitiesResult;
        return loadStatesResult && loadStatesResult.items && (loadStatesResult.items.length > 0);
    };

    protected shouldControlsAvailable = (): boolean => {
        return this.$scope.loadCities;
    };

    /*
    * Called when add faq is clicked.
    * */
    protected clickAddCity = (): void => {

        const modalResult = this.$detailedCityModals
            .displayAddCityModalAsync()
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

    /*
    * called when delete city is clicked.
    * */
    protected clickDeleteCity = (stateId: string): void => {

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$cities.deleteCityAsync(stateId)
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

    /*
    * Called when edit states is clicked.
    * */
    protected clickEditCity = (city: CityViewModel): void => {

        const modalResult = this.$detailedCityModals
            .displayEditCityModalAsync(city)
            .then((model: EditCityViewModel) => {
                // Display loading ui.
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$cities.editCityAsync(city.id, model);
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

    /*
    * Open cities finder modal.
    * */
    protected clickOpenCitiesFinderModal = (): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'cityFilter',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    states: () => this.$scope.states
                }
            }).result;

    };

    /*
    * Called when reload cities is clicked.
    * */
    protected clickReloadCities = (page: number): void => {
        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        // Page number is not defined.
        if (page > 0) {
            this.$scope.loadCitiesConditions.pager.page = page;
        }

        // Reload cities using specific conditions.
        this.$cities
            .loadCitiesAsync(this.$scope.loadCitiesConditions)
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.loadCitiesResult = loadCitiesResult
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    /*
    * Load cities asynchronously.
    * */
    protected loadCitiesAsync = (conditions: LoadCitiesViewModel): IPromise<SearchResultViewModel<CityViewModel>> => {
        return this.$cities
            .loadCitiesAsync(conditions);
    };

    //#endregion
}
