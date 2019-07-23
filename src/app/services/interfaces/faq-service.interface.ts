import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FaqViewModel} from "../../view-models/faq/faq.view-model";
import {LoadFaqsViewModel} from "../../view-models/faq/load-faqs.view-model";
import {AddFaqViewModel} from "../../view-models/faq/add-faq.view-model";
import {EditFaqViewModel} from "../../view-models/faq/edit-faq.view-model";

export interface IFaqService {

    //#region Methods

    /*
    * Load FAQs asynchronously.
    * */
    loadFaqsAsync(loadFaqsModel: LoadFaqsViewModel): IPromise<SearchResultViewModel<FaqViewModel>>;

    /*
    * Add faq into system asynchronously.
    * */
    addFaqAsync(model: AddFaqViewModel): IPromise<FaqViewModel>;

    /*
    * Delete faq by id.
    * */
    deleteFaqAsync(faqId: string): IPromise<void>;

    /*
    * Edit faq by id.
    * */
    editFaqAsync(faqId: string, model: EditFaqViewModel): IPromise<FaqViewModel>;

    //#endregion

}
