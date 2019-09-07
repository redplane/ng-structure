export class KeyValueModel<T> {

    //#region Properties

    public key: string;

    public value: T;

    //#endregion

    //#region Constructor

    public constructor(key: string, value: T) {
        this.key = key;
        this.value = value;
    }

    //#endregion

}
