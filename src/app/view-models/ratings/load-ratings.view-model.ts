import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadRatingsViewModel {

    //#region Properties

    public ids?: string[];

    public pager: PagerViewModel;

    //#endregion

    //#region Methods

    public constructor() {
        const pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
        this.pager = pager;
    }

    //#endregion

}