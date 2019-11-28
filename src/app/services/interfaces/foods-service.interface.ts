import {LoadFoodVendorViewModel} from "../../view-models/user/load-food-vendor.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {IPromise} from "angular";
import {FoodTypes} from "../../enums/food-types.enum";
import {FoodCategories} from "../../enums/food-categories.enum";
import {FoodStatuses} from "../../enums/food-statuses.enum";
import {PromotionViewModel} from "../../view-models/promotion.view-model";

export interface IFoodService {

    //#region Methods

    loadFoodsAsync(condition: LoadFoodVendorViewModel): IPromise<SearchResultViewModel<FoodViewModel>>;

    loadFoodTypeTitle(foodType: FoodTypes): string;

    loadFoodCategoryTitle(foodCategory: FoodCategories): string;

    loadFoodStatusTitle(foodStatus: FoodStatuses): string;

    shouldPromotionValid(promotion: PromotionViewModel): boolean;

    //#endregion

}
