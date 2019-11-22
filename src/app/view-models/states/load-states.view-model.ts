import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadStatesViewModel {

    //#region Properties

    public ids: string[];

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel();
        this.pager.page = 1;
        this.pager.records = ValidationValueConstant.maxRecordsPerSearchPage;
    }

    //#endregion
}
