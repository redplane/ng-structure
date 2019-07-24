import {EditableFieldViewModel} from "../editable-field.view-model";

export class EditCityViewModel {

    //#region Properties

    public id: string;

    public name: EditableFieldViewModel<string>;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        this.id = id;
        this.name = new EditableFieldViewModel<string>();
    }

    //#endregion

}
