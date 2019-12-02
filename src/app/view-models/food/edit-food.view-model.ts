import {EditableFieldViewModel} from "../editable-field.view-model";
import {FoodTypes} from "../../enums/food-types.enum";
import {FoodStatuses} from "../../enums/food-statuses.enum";
import {PromotionViewModel} from "../promotion.view-model";
import {FoodCategories} from "../../enums/food-categories.enum";
import {IRegion} from "../../interfaces/region.interface";

export class EditFoodViewModel {

    public name: EditableFieldViewModel<string>;

    public status: EditableFieldViewModel<FoodStatuses>;

    public price: EditableFieldViewModel<number>;

    public hasPromotion: EditableFieldViewModel<boolean>;

    public promotion: EditableFieldViewModel<PromotionViewModel>;

    public category: EditableFieldViewModel<FoodCategories>;

    public types: EditableFieldViewModel<FoodTypes[]>;

    public description: EditableFieldViewModel<string>;

    public ingredient: EditableFieldViewModel<string>;

    public assignedLocations: EditableFieldViewModel<IRegion[]>;

    public minimumOrderedQuantity: EditableFieldViewModel<number>;


    public constructor() {
        this.name = new EditableFieldViewModel<string>();
        this.status = new EditableFieldViewModel<FoodStatuses>();
        this.price = new EditableFieldViewModel<number>();
        this.hasPromotion = new EditableFieldViewModel<boolean>();
        this.promotion = new EditableFieldViewModel<PromotionViewModel>();
        this.category = new EditableFieldViewModel<FoodCategories>();
        this.types = new EditableFieldViewModel<FoodTypes[]>();
        this.description = new EditableFieldViewModel<string>();
        this.ingredient = new EditableFieldViewModel<string>();
        this.minimumOrderedQuantity = new EditableFieldViewModel<number>();
    }
}
