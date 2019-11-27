import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadFoodVendorViewModel {

    //#region Properties

    public username?: string;

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel(1, ValidationValueConstant.maxSupportedSearchRecords);
    }

    //#endregion

}
