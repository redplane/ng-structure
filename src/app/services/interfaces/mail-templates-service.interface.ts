import {LoadMailTemplateViewModel} from "../../view-models/mail-templates/load-mail-template.view-model";
import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MailTemplateViewModel} from "../../view-models/mail-templates/mail-template.view-model";
import {EditMailTemplateViewModel} from "../../view-models/mail-templates/edit-mail-template.view-model";
import {AddMailTemplateViewModel} from "../../view-models/mail-templates/add-mail-template.view-model";

export interface IMailTemplatesService {

    //#region Methods

    addMailTemplateAsync(model: AddMailTemplateViewModel): IPromise<MailTemplateViewModel>;

    editMailTemplateAsync(id: string, model: EditMailTemplateViewModel): IPromise<MailTemplateViewModel>;

    loadMailTemplateByIdAsync(id: string): IPromise<MailTemplateViewModel>;

    loadMailTemplatesAsync(condition: LoadMailTemplateViewModel): IPromise<SearchResultViewModel<MailTemplateViewModel>>;

    loadAvailableMailTemplatesAsync(): IPromise<string[]>;

    //#endregion

}
