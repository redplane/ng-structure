import {IController, IPromise, IQService} from "angular";
import {IRatingManagementScope} from "./rating-management.scope";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {IRatingsService} from "../../services/interfaces/ratings-service.interface";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FaqViewModel} from "../../view-models/faq/faq.view-model";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {RatingViewModel} from "../../view-models/ratings/rating.view-model";
import {LoadRatingsViewModel} from "../../view-models/ratings/load-ratings.view-model";
import {AddRatingViewModel} from "../../view-models/ratings/add-rating.view-model";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";

/* @ngInject */
export class RatingManagementController implements IController {

    //#region Constructor

    public constructor(protected $scope: IRatingManagementScope,
                       protected $ratings: IRatingsService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $q: IQService,
                       protected $uibModal: angular.ui.bootstrap.IModalService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService) {

        // Properties initialization.
        $scope.masterItemAvailabilities = MasterItemAvailabilities;
        $scope.loadRatingsCondition = new LoadRatingsViewModel();

        // Method initialization.
        $scope.shouldRatingsDisplayed = this._shouldRatingsDisplayed;
        $scope.clickDisplayAddRatingModal = this._clickDisplayAddRatingModal;
        $scope.clickReloadRatings = this._clickReloadRatings;
        $scope.clickDeleteRating = this._clickDeleteRating;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadRatings();
    }

    //#endregion

    //#region Internal methods

    protected _shouldRatingsDisplayed = (): boolean => {
        const loadItemsResult = this.$scope.loadRatingsResult;
        return loadItemsResult && loadItemsResult.items && (loadItemsResult.items.length > 0);
    };

    protected _clickDisplayAddRatingModal = (): void => {

        this._displayAddRatingModalAsync()
            .then((model: AddRatingViewModel) => {

                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui,
                        MessageEventNameConstant.toggleFullScreenLoader, true);

                this.$ratings
                    .addRatingAsync(model)
                    .then((addedRating: RatingViewModel) => {
                        return this.$ratings
                            .loadRatingsAsync(this.$scope.loadRatingsCondition)
                    })
                    .then((loadRatingsResult: SearchResultViewModel<RatingViewModel>) => {
                        this.$scope.loadRatingsResult = loadRatingsResult;
                    })
                    .finally(() => {
                        this.$messageBus
                            .addMessage(MessageChannelNameConstant.ui,
                                MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            });
    };

    protected _displayAddRatingModalAsync = (): IPromise<AddRatingViewModel> => {
        const loadRatingEditorTemplatePromise = this
            .$q((resolve) => {
                require.ensure([], () => resolve(require('./detailed-rating-modal/detailed-rating-modal.html')));
            });

        const loadRatingEditorControllerPromise = import('./detailed-rating-modal/detailed-rating-modal.controller')
            .then(m => m.DetailedRatingModalController);

        return this.$q
            .all([loadRatingEditorTemplatePromise, loadRatingEditorControllerPromise])
            .then((resources: any[]) => {
                const modalInstance = this.$uibModal
                    .open({
                        template: resources[0],
                        controller: resources[1],
                        resolve: {
                            detailedRating: () => null
                        }
                    });

                return modalInstance
                    .result;
            });
    };

    protected _clickReloadRatings = (): void => {
        this.$scope.loadingRatings = true;

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$ratings
            .loadRatingsAsync(this.$scope.loadRatingsCondition)
            .then((loadRatingsResult: SearchResultViewModel<RatingViewModel>) => {
                this.$scope.loadRatingsResult = loadRatingsResult;
            })
            .finally(() => {
                this.$scope.loadingRatings = false;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickDeleteRating = (rating: RatingViewModel): void => {
        const htmlContent = this.$translate.instant('MSG_DELETE_RATING', rating);
        const titleOk = this.$translate.instant('TITLE_OK');
        const titleCancel = this.$translate.instant('TITLE_CANCEL');

        this.$messageModals
            .displayBasicModalAsync<void>({
                bodyClass: {'text-center': true},
                htmlContent: `<b class="text-danger">${htmlContent}</b>`,
                footerClass: {'justify-content-center': true},
                buttons: [
                    {
                        htmlContent: `<span>${titleOk}</span>`,
                        handleClickAction: () => this.$q.resolve(true),
                        buttonClass: {'btn btn-outline-primary': true}
                    },
                    {
                        htmlContent: `<span>${titleCancel}</span>`,
                        handleClickAction: () => this.$q.reject(),
                        buttonClass: {'btn btn-outline-secondary': true}
                    }
                ]
            })
            .then(() => {

                // Display loading ui.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

                // Delete rating from system.
                this.$ratings.deleteRatingAsync(rating.id)
                    .then(() => {
                        return this.$ratings
                            .loadRatingsAsync(this.$scope.loadRatingsCondition)
                    })
                    .then((loadRatingsResult: SearchResultViewModel<RatingViewModel>) => {
                        this.$scope.loadRatingsResult = loadRatingsResult;
                    })
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    })
            });
    };

    //#endregion
}
