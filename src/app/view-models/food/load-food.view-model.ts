import {FoodTypes} from "../../enums/food-types.enum";
import {IRegion} from "../../interfaces/region.interface";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {PagerViewModel} from "../pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class LoadFoodViewModel {

    //#region Properties

    public ids?: string[];

    public types?: FoodTypes;

    public categories?: FoodTypes[];

    public regions?: IRegion[];

    public availability?: MasterItemAvailabilities;

    public pager: PagerViewModel;

    //#endregion

    //#region Constructor

    public constructor() {
        this.pager = new PagerViewModel(1, ValidationValueConstant.maxRecordsPerSearchPage);
    }

    //#endregion

}
