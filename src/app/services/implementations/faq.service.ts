import {IFaqService} from "../interfaces/faq-service.interface";
import {FaqViewModel} from "../../view-models/faq/faq.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {IHttpResponse, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {LoadFaqsViewModel} from "../../view-models/faq/load-faqs.view-model";

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

    //#endregion

}
