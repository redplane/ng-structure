import {LoadFoodVendorViewModel} from "../../view-models/user/load-food-vendor.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {IPromise} from "angular";

export interface IFoodService {

    //#region Methods

    loadFoodsAsync(condition: LoadFoodVendorViewModel): IPromise<SearchResultViewModel<FoodViewModel>>;

    //#endregion

}
