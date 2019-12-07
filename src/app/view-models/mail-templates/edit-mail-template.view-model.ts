import {EditableFieldViewModel} from "../editable-field.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {MailTemplateKinds} from "../../enums/mail-template-kinds.enum";

export class EditMailTemplateViewModel {

    //#region Properties

    name: EditableFieldViewModel<string>;

    subject: EditableFieldViewModel<string>;

    content: EditableFieldViewModel<string>;

    kind: EditableFieldViewModel<MailTemplateKinds>;

    availability: EditableFieldViewModel<MasterItemAvailabilities>;

    description: EditableFieldViewModel<string>;

    //#endregion

}
