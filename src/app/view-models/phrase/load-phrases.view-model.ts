import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadPhrasesViewModel {

    //#region Properties

    public ids?: string[];

    public availabilities?: MasterItemAvailabilities[];

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
    }

    //#endregion

}