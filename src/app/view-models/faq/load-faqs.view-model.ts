import {PagerViewModel} from "../pager.view-model";

export class LoadFaqsViewModel {

    //#region Properties

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel();
        this.pager.page = 1;
        this.pager.records = 150;
    }

    //#endregion

}
