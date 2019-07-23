import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {FaqViewModel} from "../../../view-models/faq/faq.view-model";
import {LoadFaqsViewModel} from "../../../view-models/faq/load-faqs.view-model";

export interface IFaqMasterPageScope {

    //#region Properties

    /*
    * Result of loading faqs.
    * */
    loadFaqsResult: SearchResultViewModel<FaqViewModel>;

    /*
    * Whether faqs are being loaded or not.
    * */
    loadingFaqs: boolean;

    /*
    * Condition to load faq items.
    * */
    loadFaqsConditions: LoadFaqsViewModel;

    //#endregion

    //#region Methods

    /*
    * Should faqs list be displayed or not.
    * */
    shouldFaqsDisplayed: () => boolean;

    /*
    * Should the controls be available or not.
    * */
    shouldControlsAvailable: () => boolean;

    /*
    * Called when faq master page is loaded.
    * */
    ngOnFaqMasterPageLoaded: () => void;

    /*
    * Add faq.
    * */
    clickAddFaq: () => void;

    /*
    * Delete faq
    * */
    clickDeleteFaq: (faqId: string) => void;

    /*
    * Raised when edit faq is clicked.
    * */
    clickEditFaq: (faq: FaqViewModel) => void;

    //#endregion
}
