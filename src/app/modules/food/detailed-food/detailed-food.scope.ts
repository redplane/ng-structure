import {IScope} from "angular";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {CarouselItem} from "../../../models/carousel-item";
import {FoodTypes} from "../../../enums/food-types.enum";
import {FoodCategories} from "../../../enums/food-categories.enum";
import {FoodStatuses} from "../../../enums/food-statuses.enum";
import {PromotionViewModel} from "../../../view-models/promotion.view-model";

export interface IDetailedFoodScope extends IScope {

    //#region Properties

    detailedFood: FoodViewModel;

    carouselItems: CarouselItem[];

    //#endregion

    //#region Methods

    loadFoodTypeTitle(foodType: FoodTypes): string;

    loadFoodCategoryTitle(foodCategory: FoodCategories): string;

    loadFoodStatusTitle(foodStatus: FoodStatuses): string;

    shouldPromotionValid(promotion: PromotionViewModel): boolean;
    //#endregion
}
