import {PromotionViewModel} from "../promotion.view-model";
import {FoodTypes} from "../../enums/food-types.enum";
import {FoodStatuses} from "../../enums/food-statuses.enum";
import {FoodCategories} from "../../enums/food-categories.enum";
import {IRegion} from "../../interfaces/region.interface";

export class AddFoodViewModel {

    //#region Properties

    public name: string;

    public price: number;

    public description: string;

    public ingredient: string;

    public promotion: PromotionViewModel;

    public types: FoodTypes[];

    public status: FoodStatuses;

    public category: FoodCategories;

    public assignedLocations: IRegion[];

    public minimumOrderedQuantity: number;

    public hasPromotion: boolean;

    public photos: Blob[] | null;

    //#endregion

}
