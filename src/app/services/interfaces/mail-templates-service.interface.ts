import {LoadMailTemplateViewModel} from "../../view-models/mail-templates/load-mail-template.view-model";
import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MailTemplateViewModel} from "../../view-models/mail-templates/mail-template.view-model";
import {EditMailTemplateViewModel} from "../../view-models/mail-templates/edit-mail-template.view-model";

export interface IMailTemplatesService {

    //#region Methods

    editMailTemplateAsync(id: string, model: EditMailTemplateViewModel): IPromise<MailTemplateViewModel>

    loadMailTemplatesAsync(condition: LoadMailTemplateViewModel): IPromise<SearchResultViewModel<MailTemplateViewModel>>;

    //#endregion

}
