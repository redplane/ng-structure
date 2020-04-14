import {IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MailTemplateViewModel} from "../../view-models/mail-templates/mail-template.view-model";
import {LoadMailTemplateViewModel} from "../../view-models/mail-templates/load-mail-template.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export interface IMailTemplateManagementScope extends IScope {

    //#region Properties

    loadMailTemplatesResult: SearchResultViewModel<MailTemplateViewModel>;

    loadMailTemplatesConditions: LoadMailTemplateViewModel;

    loadingMailTemplates: boolean;

    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    shouldMailTemplatesDisplayed(): boolean;

    clickReloadMailTemplates(page?: number): void;

    clickDeleteMailTemplate(mailTemplate: MailTemplateViewModel): void;

    clickEditMailTemplate(id: string): void;

    clickAddMailTemplate(): void;

    //#endregion
}
