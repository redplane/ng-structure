import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FaqViewModel} from "../../view-models/faq/faq.view-model";
import {LoadFaqsViewModel} from "../../view-models/faq/load-faqs.view-model";

export interface IFaqService {

    //#region Methods

    /*
    * Load FAQs asynchronously.
    * */
    loadFaqsAsync(loadFaqsModel: LoadFaqsViewModel): IPromise<SearchResultViewModel<FaqViewModel>>;

    //#endregion

}
