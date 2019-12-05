import {IMailTemplatesService} from "../interfaces/mail-templates-service.interface";
import {IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {LoadMailTemplateViewModel} from "../../view-models/mail-templates/load-mail-template.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MailTemplateViewModel} from "../../view-models/mail-templates/mail-template.view-model";
import {EditMailTemplateViewModel} from "../../view-models/mail-templates/edit-mail-template.view-model";

export class MailTemplatesService implements IMailTemplatesService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
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

    public loadMailTemplatesAsync(condition: LoadMailTemplateViewModel): IPromise<SearchResultViewModel<MailTemplateViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/mail-template/search`;
        return this.$http
            .post<SearchResultViewModel<MailTemplateViewModel>>(fullUrl, condition)
            .then(m => m.data);
    }

    //#endregion

}
