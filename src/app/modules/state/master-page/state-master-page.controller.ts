import {IController, IPromise} from "angular";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {IFaqService} from "../../../services/interfaces/faq-service.interface";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {IModalService} from "angular-ui-bootstrap";
import {AddFaqViewModel} from "../../../view-models/faq/add-faq.view-model";
import {UiService} from "../../../services/implementations/ui.service";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {IStateMasterPageScope} from "./state-master-page.scope";
import {LoadStatesViewModel} from "../../../view-models/state/load-states.view-model";
import {StateViewModel} from "../../../view-models/state/state-view.model";
import {IStateService} from "../../../services/interfaces/state-service.interface";
import {AddStateViewModel} from "../../../view-models/state/add-state.view-model";
import {EditStateViewModel} from "../../../view-models/state/edit-state.view-model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

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
                       protected $states: IStateService,
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
        this.$scope.ngOnStateMasterPageLoaded = this.ngOnStateMasterPageLoaded;
        this.$scope.clickAddState = this.clickAddState;
        this.$scope.clickDeleteState = this.clickDeleteState;
        this.$scope.clickEditState = this.clickEditState;

        this.$scope.masterItemAvailabilities = MasterItemAvailabilities;
    }

    //#endregion

    //#region Methods

    protected shouldStatesDisplayed = (): boolean => {
        const loadStatesResult = this.$scope.loadStatesResult;
        return loadStatesResult && loadStatesResult.items && (loadStatesResult.items.length > 0);
    };

    protected shouldControlsAvailable = (): boolean => {
        return this.$scope.loadStates;
    };

    protected ngOnStateMasterPageLoaded = (): void => {

        this.$scope.loadStates = true;

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$states
            .loadStatesAsync(this.$scope.loadStatesConditions)
            .then((loadStatesResult: SearchResultViewModel<StateViewModel>) => {
                this.$scope.loadStatesResult = loadStatesResult;
            })
            .finally(() => {
                this.$scope.loadStates = false;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    /*
    * Called when add faq is clicked.
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

                // Reload faqs.
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
                // Reload faqs.
                return this.loadStatesAsync(this.$scope.loadStatesConditions);
            })
            .then((loadFaqsResult: SearchResultViewModel<StateViewModel>) => {
                this.$scope.loadStatesResult = loadFaqsResult;
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
                const message = this.$translate.instant('MSG_ADDED_FAQ_SUCCESSFULLY');

                // Reload faqs.
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

    protected loadStatesAsync = (conditions: LoadStatesViewModel): IPromise<SearchResultViewModel<StateViewModel>> => {
        return this.$states
            .loadStatesAsync(conditions);
    };

    //#endregion
}
