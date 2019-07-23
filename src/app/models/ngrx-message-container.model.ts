export class NgrxMessageContainerModel<T> {

    //#region Properties

    public data: T;

    public createdTime: number;

    public lifeTime?: number | null;

    public available: boolean;

    //#endregion
}
