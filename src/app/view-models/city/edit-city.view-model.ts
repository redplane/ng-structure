import {EditableFieldViewModel} from "../editable-field.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export class EditCityViewModel {

    //#region Properties

    public id: string;

    public name: EditableFieldViewModel<string>;

    public availability: EditableFieldViewModel<MasterItemAvailabilities>;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        this.id = id;
        this.name = new EditableFieldViewModel<string>();
        this.availability = new EditableFieldViewModel<MasterItemAvailabilities>();
    }

    //#endregion

}
