export class EditableFieldViewModel<T> {

    //#region Properties

    public value: T;

    public hasModified: boolean;

    //#endregion

    //#region Constructor

    public constructor() {
        this.hasModified = false;
    }

    //#endregion

}
