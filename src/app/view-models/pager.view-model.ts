export class PagerViewModel {

    //#region Properties

    public page: number;

    public records: number;

    //#endregion

    //#region Constructor

    public constructor(page?: number, records?: number) {
        this.page = page;
        this.records = records;
    }

    //#endregion
}
