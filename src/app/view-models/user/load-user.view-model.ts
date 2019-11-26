import {PagerViewModel} from "../pager.view-model";

export class LoadUserViewModel {

    //#region Properties

    public ids?: string[];

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor(pager?: PagerViewModel) {
        this.pager = pager;
    }

    //#endregion

}
