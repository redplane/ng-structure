import {IScope} from "angular";
import {MailTemplateViewModel} from "../../../view-models/mail-templates/mail-template.view-model";
import {EditorModes} from "../../../enums/edit-modes.enum";

export interface IDetailedMailTemplateScope extends IScope {

    //#region Properties

    initialDetailedMailTemplate: MailTemplateViewModel;

    detailedMailTemplate: MailTemplateViewModel;

    editorMode: EditorModes;

    editorModes: typeof EditorModes;

    availableMailTemplateNames: string[];

    //#endregion

    //#region Methods

    shouldMailTemplateEditable(): boolean;

    shouldAvailableMailTemplateNameDisabled(): boolean;

    //#endregion

}
