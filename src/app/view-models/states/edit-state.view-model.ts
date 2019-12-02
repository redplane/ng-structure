import {EditableFieldViewModel} from "../editable-field.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export class EditStateViewModel {

    //#region Properties

    public id: string;

    public name: EditableFieldViewModel<string>;

    public deliveryFee: EditableFieldViewModel<number>;

    public availability: EditableFieldViewModel<MasterItemAvailabilities>;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        this.id = id;
        this.name = new EditableFieldViewModel<string>();
        this.deliveryFee = new EditableFieldViewModel<number>();
        this.availability = new EditableFieldViewModel<MasterItemAvailabilities>();
    }

    //#endregion

}
