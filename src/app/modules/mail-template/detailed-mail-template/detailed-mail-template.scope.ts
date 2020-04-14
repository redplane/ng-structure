import {IScope} from "angular";
import {MailTemplateViewModel} from "../../../view-models/mail-templates/mail-template.view-model";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {KeyValueModel} from "../../../models/key-value.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {IDetailedMailTemplateForm} from "./detailed-mail-template-form.interface";

export interface IDetailedMailTemplateScope extends IScope {

    //#region Properties

    detailedMailTemplateForm: IDetailedMailTemplateForm;

    initialDetailedMailTemplate: MailTemplateViewModel;

    detailedMailTemplate: MailTemplateViewModel;

    editorMode: EditorModes;

    editorModes: typeof EditorModes;

    availableMailTemplateNames: string[];

    availableAvailabilities: KeyValueModel<MasterItemAvailabilities>[];

    //#endregion

    //#region Methods

    shouldMailTemplateEditable(): boolean;

    shouldMailTemplateAddable(): boolean;

    shouldAvailableMailTemplateNameDisabled(): boolean;

    clickReloadModel(): void;

    clickSubmitMailTemplateEdit(): void;

    clickSubmitMailTemplateAdd(): void;

    clickImportContent(): void;

    //#endregion

}
