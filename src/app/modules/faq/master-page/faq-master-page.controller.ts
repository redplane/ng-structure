import {IController, IPromise} from "angular";
import {IFaqMasterPageScope} from "./faq-master-page.scope";
import {FaqViewModel} from "../../../view-models/faq/faq.view-model";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {IFaqService} from "../../../services/interfaces/faq-service.interface";
import {LoadFaqsViewModel} from "../../../view-models/faq/load-faqs.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {IModalService} from "angular-ui-bootstrap";
import {AddFaqViewModel} from "../../../view-models/faq/add-faq.view-model";
import {UiService} from "../../../services/implementations/ui.service";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {EditFaqViewModel} from "../../../view-models/faq/edit-faq.view-model";

/* @ngInject */
export class FaqMasterPageController implements IController {

    //#region Properties


    //#endregion

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IFaqMasterPageScope,
                       protected $faqs: IFaqService,
                       protected $uibModal: IModalService,
                       protected $ui: UiService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $translate: angular.translate.ITranslateService) {

        // Properties binding.
        this.$scope.loadFaqsResult = new SearchResultViewModel<FaqViewModel>();

        const loadFaqsModel = new LoadFaqsViewModel();
        loadFaqsModel.pager = new PagerViewModel();
        loadFaqsModel.pager.page = 1;
        loadFaqsModel.pager.records = ValidationValueConstant.maxRecordsPerSearchPage;
        this.$scope.loadFaqsConditions = loadFaqsModel;

        // Methods binding.
        this.$scope.shouldFaqsDisplayed = this.shouldFaqsDisplayed;
        this.$scope.shouldControlsAvailable = this.shouldControlsAvailable;
        this.$scope.ngOnFaqMasterPageLoaded = this.ngOnFaqMasterPageLoaded;
        this.$scope.clickAddFaq = this.clickAddFaq;
        this.$scope.clickDeleteFaq = this.clickDeleteFaq;
        this.$scope.clickEditFaq = this.clickEditFaq;
    }

    //#endregion

    //#region Methods

    protected shouldFaqsDisplayed = (): boolean => {
        const loadFaqsResult = this.$scope.loadFaqsResult;
        return loadFaqsResult && loadFaqsResult.items && (loadFaqsResult.items.length > 0);
    };

    protected shouldControlsAvailable = (): boolean => {
        return this.$scope.loadingFaqs;
    };

    public $onInit(): void {
        this.ngOnFaqMasterPageLoaded();
    }

    protected ngOnFaqMasterPageLoaded = (): void => {

        this.$scope.loadingFaqs = true;

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$faqs
            .loadFaqsAsync(this.$scope.loadFaqsConditions)
            .then((loadFaqsResult: SearchResultViewModel<FaqViewModel>) => {
                this.$scope.loadFaqsResult = loadFaqsResult;
            })
            .finally(() => {
                this.$scope.loadingFaqs = false;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    /*
    * Called when add faq is clicked.
    * */
    protected clickAddFaq = (): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'faqDetail',
                size: 'lg',
                backdrop: 'static'
            }).result;

        modalResult
            .then((editFaqModel: AddFaqViewModel) => {
                // Display loading ui.
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$faqs.addFaqAsync(editFaqModel);
            })
            .then(() => {
                const message = this.$translate.instant('MSG_ADDED_FAQ_SUCCESSFULLY');

                // Reload faqs.
                return this.loadFaqsAsync(this.$scope.loadFaqsConditions);
            })
            .then((loadFaqsResult: SearchResultViewModel<FaqViewModel>) => {
                this.$scope.loadFaqsResult = loadFaqsResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            })
    };

    protected clickDeleteFaq = (faqId: string): void => {

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$faqs.deleteFaqAsync(faqId)
            .then(() => {
                // Reload faqs.
                return this.loadFaqsAsync(this.$scope.loadFaqsConditions);
            })
            .then((loadFaqsResult: SearchResultViewModel<FaqViewModel>) => {
                this.$scope.loadFaqsResult = loadFaqsResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected clickEditFaq = (faq: FaqViewModel): void => {

        const modalResult = this.$uibModal
            .open({
                component: 'faqDetail',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    faq: () => {
                        return {
                            ...faq
                        };
                    }
                }
            }).result;

        modalResult
            .then((editFaqModel: EditFaqViewModel) => {
                // Display loading ui.
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$faqs.editFaqAsync(faq.id, editFaqModel);
            })
            .then(() => {
                const message = this.$translate.instant('MSG_ADDED_FAQ_SUCCESSFULLY');

                // Reload faqs.
                return this.loadFaqsAsync(this.$scope.loadFaqsConditions);
            })
            .then((loadFaqsResult: SearchResultViewModel<FaqViewModel>) => {
                this.$scope.loadFaqsResult = loadFaqsResult;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            })
    };

    protected loadFaqsAsync = (conditions: LoadFaqsViewModel): IPromise<SearchResultViewModel<FaqViewModel>> => {
        return this.$faqs
            .loadFaqsAsync(conditions);
    };

    //#endregion
}
