import {IMailTemplatesService} from "../interfaces/mail-templates-service.interface";
import {IHttpService, IPromise, IQService} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {LoadMailTemplateViewModel} from "../../view-models/mail-templates/load-mail-template.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MailTemplateViewModel} from "../../view-models/mail-templates/mail-template.view-model";
import {EditMailTemplateViewModel} from "../../view-models/mail-templates/edit-mail-template.view-model";
import {PagerViewModel} from "../../view-models/pager.view-model";

export class MailTemplatesService implements IMailTemplatesService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected $q: IQService,
                       protected appSettings: IAppSettings) {
    }

    //#endregion

    //#region Methods

    public editMailTemplateAsync(id: string, model: EditMailTemplateViewModel):  IPromise<MailTemplateViewModel> {

        const fullUrl = `${this.appSettings.apiEndpoint}/api/mail-template/${id}`;
        const keys = ['name', 'subject', 'content', 'kind', 'availability', 'description'];
        const data = new FormData();

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        for (const key of keys) {

            if (model[key] && model[key].hasModified) {
                data.append(`${key}[value]`, model[key].value);
                data.append(`${key}[hasModified]`, 'true');
            }
        }

        return this.$http
            .put<MailTemplateViewModel>(fullUrl, data, httpRequestOptions)
            .then(m => m.data);

    }

    public loadMailTemplateByIdAsync(id: string): IPromise<MailTemplateViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/mail-template/search`;
        const condition = new LoadMailTemplateViewModel();
        condition.ids = [id];
        condition.pager = new PagerViewModel(1, 1);

        return this.$http
            .post<SearchResultViewModel<MailTemplateViewModel>>(fullUrl, condition)
            .then(m => m.data)
            .then(loadMailTemplatesResult => {
                if (!loadMailTemplatesResult) {
                    return this.$q.reject('Mail template is not found');
                }

                const mailTemplates = loadMailTemplatesResult.items;
                if (!mailTemplates || !mailTemplates.length) {
                    return this.$q.reject('Mail template is not found');
                }

                return mailTemplates[0];
            });
    }

    public loadMailTemplatesAsync(condition: LoadMailTemplateViewModel): IPromise<SearchResultViewModel<MailTemplateViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/mail-template/search`;
        return this.$http
            .post<SearchResultViewModel<MailTemplateViewModel>>(fullUrl, condition)
            .then(m => m.data);
    }

    public loadAvailableMailTemplatesAsync(): IPromise<string[]> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/mail-template/supported-names`;
        return this.$http
            .get<string[]>(fullUrl)
            .then(m => m.data);
    }

    //#endregion

}
