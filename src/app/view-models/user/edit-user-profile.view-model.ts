import {EditableFieldViewModel} from "../editable-field.view-model";

export class EditUserProfileViewModel {

    //#region Properties

    fullName: EditableFieldViewModel<string>;

    phoneNo: EditableFieldViewModel<string>;

    password: EditableFieldViewModel<string>;

    photo: EditableFieldViewModel<Blob>;

    //#endregion

}