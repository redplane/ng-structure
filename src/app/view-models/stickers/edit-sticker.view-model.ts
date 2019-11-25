import {EditableFieldViewModel} from "../editable-field.view-model";

export class EditStickerViewModel {

    //#region Properties

    public stickerId: string;

    public name: EditableFieldViewModel<string>;

    public photo: EditableFieldViewModel<Blob>;

    //#endregion

}