import {IController, IPromise} from "angular";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {IModalService} from "angular-ui-bootstrap";
import {UiService} from "../../../services/implementations/ui.service";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {IStateMasterPageScope} from "./state-master-page.scope";
import {LoadStatesViewModel} from "../../../view-models/states/load-states.view-model";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {IStatesService} from "../../../services/interfaces/state-service.interface";
import {AddStateViewModel} from "../../../view-models/states/add-state.view-model";
import {EditStateViewModel} from "../../../view-models/states/edit-state.view-model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {CityViewModel} from "../../../view-models/city/city.view-model";

/* @ngInject */
export class StateMasterPageController implements IController {

    //#region Properties


    //#endregion

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IStateMasterPageScope,
                       protected $uibModal: IModalService,
                       protected $ui: UiService,
                       protected $states: IStatesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $translate: angular.translate.ITranslateService) {

        // Properties binding.
        this.$scope.loadStatesResult = new SearchResultViewModel<StateViewModel>();

        const loadStatesModel = new LoadStatesViewModel();
        loadStatesModel.pager = new PagerViewModel();
        loadStatesModel.pager.page = 1;
        loadStatesModel.pager.records = ValidationValueConstant.maxRecordsPerSearchPage;
        this.$scope.loadStatesConditions = loadStatesModel;

        // Methods binding.
        this.$scope.shouldStatesDisplayed = this.shouldStatesDisplayed;
        this.$scope.shouldControlsAvailable = this.shouldControlsAvailable;
        this.$scope.clickAddState = this.clickAddState;
        this.$scope.clickDeleteState = this.clickDeleteState;
        this.$scope.clickEditState = this.clickEditState;

        this.$scope.masterItemAvailabilities = MasterItemAvailabilities;
    }

    //#endregion

    //#region Methods

    /*
    * Called when controller initialized.
    * */
    public $onInit(): void {
        this.clickReloadStates(1)
    }

    /*
    * Whether states should be displayed or not.
    * */
    protected shouldStatesDisplayed = (): boolean => {
        const loadStatesResult = this.$scope.loadStatesResult;
        return loadStatesResult && loadStatesResult.items && (loadStatesResult.items.length > 0);
    };

    /*
    * Whether controls should be available or not.
    * */
    protected shouldControlsAvailable = (): boolean => {
        return this.$scope.loadStates;
    };

    /*
    * Called when add states is clicked.
    * */
    protected clickAddState = (): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'stateDetail',
                size: 'lg',
                backdrop: 'static'
            }).result;

        modalResult
            .then((model: AddStateViewModel) => {
                // Display loading ui.
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$states.addStateAsync(model);
            })
            .then(() => {
                const message = this.$translate.instant('MSG_ADDED_STATE_SUCCESSFULLY');

                // Reload states.
                return this.loadStatesAsync(this.$scope.loadStatesConditions);
            })
            .then((loadStatesResult: SearchResultViewModel<StateViewModel>) => {
                this.$scope.loadStatesResult = loadStatesResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected clickDeleteState = (stateId: string): void => {

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$states.deleteStateAsync(stateId)
            .then(() => {
                // Reload states.
                return this.loadStatesAsync(this.$scope.loadStatesConditions);
            })
            .then((loadCitiesResult: SearchResultViewModel<StateViewModel>) => {
                this.$scope.loadStatesResult = loadCitiesResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected clickEditState = (state: StateViewModel): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'stateDetail',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    state: () => {
                        return {
                            ...state
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
                const message = this.$translate.instant('MSG_ADDED_STATE_SUCCESSFULLY');

                // Reload states.
                return this.loadStatesAsync(this.$scope.loadStatesConditions);
            })
            .then((loadStatesResult: SearchResultViewModel<StateViewModel>) => {
                this.$scope.loadStatesResult = loadStatesResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            })
    };

    /*
    * Called when reload cities is clicked.
    * */
    protected clickReloadStates = (page: number): void => {
        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        // Page number is not defined.
        if (page > 0) {
            this.$scope.loadStatesConditions.pager.page = page;
        }

        // Reload cities using specific conditions.
        this.$states
            .loadStatesAsync(this.$scope.loadStatesConditions)
            .then((loadStatesResult: SearchResultViewModel<StateViewModel>) => {
                this.$scope.loadStatesResult = loadStatesResult
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected loadStatesAsync = (conditions: LoadStatesViewModel): IPromise<SearchResultViewModel<StateViewModel>> => {
        return this.$states
            .loadStatesAsync(conditions);
    };

    //#endregion
}
