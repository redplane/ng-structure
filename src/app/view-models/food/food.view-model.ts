import {BaseEntity} from "../base-entity.view-model";
import {PromotionViewModel} from "../promotion.view-model";
import {FoodTypes} from "../../enums/food-types.enum";
import {FoodStatuses} from "../../enums/food-statuses.enum";
import {FoodCategories} from "../../enums/food-categories.enum";
import {IRegion} from "../../interfaces/region.interface";

export class FoodViewModel extends BaseEntity {

    //#region Properties

    public name: string;

    public price: number;

    public thumbnail: string;

    public description: string;

    public ingredient: string;

    public promotion: PromotionViewModel;

    public photos: string[];

    public types: FoodTypes[];

    public status: FoodStatuses;

    public category: FoodCategories;

    public assignedLocations: IRegion[];

    public minimumOrderQuantity: number;

    //#endregion

}
