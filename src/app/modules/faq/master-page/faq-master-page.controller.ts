import {IController} from "angular";
import {IFaqMasterPageScope} from "./faq-master-page.scope";
import {FaqViewModel} from "../../../view-models/faq/faq.view-model";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {IFaqService} from "../../../services/interfaces/faq-service.interface";
import {LoadFaqsViewModel} from "../../../view-models/faq/load-faqs.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";

/* @ngInject */
export class FaqMasterPageController implements IController {

    //#region Properties


    //#endregion

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IFaqMasterPageScope,
                       protected $faq: IFaqService) {

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

    protected ngOnFaqMasterPageLoaded = (): void => {

        this.$scope.loadingFaqs = true;

        this.$faq
            .loadFaqsAsync(this.$scope.loadFaqsConditions)
            .then((loadFaqsResult: SearchResultViewModel<FaqViewModel>) => {
                this.$scope.loadFaqsResult = loadFaqsResult;
            })
            .finally(() => {
                this.$scope.loadingFaqs = false;
            });
    }

    //#endregion
}
