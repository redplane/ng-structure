import {IFaqService} from "../interfaces/faq-service.interface";
import {FaqViewModel} from "../../view-models/faq/faq.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {IHttpResponse, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {LoadFaqsViewModel} from "../../view-models/faq/load-faqs.view-model";
import {AddFaqViewModel} from "../../view-models/faq/add-faq.view-model";
import {EditFaqViewModel} from "../../view-models/faq/edit-faq.view-model";

export class FaqService implements IFaqService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {

    }

    //#endregion

    //#region Methods

    public loadFaqsAsync(loadFaqsModel: LoadFaqsViewModel): IPromise<SearchResultViewModel<FaqViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/faq/search`;
        return this.$http
            .post<SearchResultViewModel<FaqViewModel>>(fullUrl, loadFaqsModel)
            .then((loadFaqsResponse: IHttpResponse<SearchResultViewModel<FaqViewModel>>) => loadFaqsResponse.data)

    }

    public addFaqAsync(model: AddFaqViewModel): IPromise<FaqViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/faq`;
        return this.$http
            .post<FaqViewModel>(fullUrl, model)
            .then((addFaqResponse: IHttpResponse<FaqViewModel>) => addFaqResponse.data)
    }

    public deleteFaqAsync(faqId: string): IPromise<void> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/faq/${faqId}`;
        return this.$http
            .delete<void>(fullUrl)
            .then((deleteFaqResponse: IHttpResponse<void>) => deleteFaqResponse.data)
    }

    public editFaqAsync(faqId: string, model: EditFaqViewModel): IPromise<FaqViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/faq/${faqId}`;
        return this.$http
            .put<FaqViewModel>(fullUrl, model)
            .then((editFaqResponse: IHttpResponse<FaqViewModel>) => editFaqResponse.data)
    }

    //#endregion

}
