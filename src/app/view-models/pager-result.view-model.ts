export class PagerResultViewModel {

    //#region Properties

    public totalRecords: number;

    public page: number;

    public pageRecords: number;

    public hasNext: boolean;

    //#endregion

    //#region Constructor

    public constructor(totalRecords?: number, page?: number, pageRecords?: number, hasNext?: boolean) {
        this.totalRecords = totalRecords;
        this.page = page;
        this.pageRecords = pageRecords;
        this.hasNext = hasNext;
    }

    //#endregion

}
