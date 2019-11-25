import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadStickersViewModel {

    //#region Properties

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
    }

    //#endregion
}