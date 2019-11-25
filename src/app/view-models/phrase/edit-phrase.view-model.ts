import {EditableFieldViewModel} from "../editable-field.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export class EditPhraseViewModel {

    //#region Properties

    public phraseId: string;

    public text: EditableFieldViewModel<string>;

    public availability: EditableFieldViewModel<MasterItemAvailabilities>;

    //#endregion

}
