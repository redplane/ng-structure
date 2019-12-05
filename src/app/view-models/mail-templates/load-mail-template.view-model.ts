import {MailTemplateKinds} from "../../enums/mail-template-kinds.enum";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadMailTemplateViewModel {

    //#region Properties

    ids: string[];

    kinds: MailTemplateKinds[];

    availabilities: MasterItemAvailabilities[];

    pager: PagerViewModel;

    //#endregion

    //#region Constructor

    constructor() {
        this.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
    }

    //#endregion
}
