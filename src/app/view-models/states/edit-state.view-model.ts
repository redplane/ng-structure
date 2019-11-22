import {EditableFieldViewModel} from "../editable-field.view-model";

export class EditStateViewModel {

    //#region Properties

    public id: string;

    public name: EditableFieldViewModel<string>;

    public deliveryFee: EditableFieldViewModel<number>;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        this.id = id;
        this.name = new EditableFieldViewModel<string>();
        this.deliveryFee = new EditableFieldViewModel<number>();
    }

    //#endregion

}
