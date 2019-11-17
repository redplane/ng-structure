export class EditableFieldViewModel<T> {

    //#region Properties

    public value: T;

    public hasModified: boolean;

    //#endregion

    //#region Constructor

    public constructor(value?: T, hasModified?: boolean) {
        this.value = value;
        this.hasModified = hasModified;
    }

    //#endregion

}
