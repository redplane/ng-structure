import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadCloudDeviceViewModel {

    //#region Properties

    public userIds?: string[];

    public deviceId?: string;

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
    }

    //#endregion

}