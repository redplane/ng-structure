import {IScope} from "angular";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {CarouselItem} from "../../../models/carousel-item";
import {FoodTypes} from "../../../enums/food-types.enum";
import {FoodCategories} from "../../../enums/food-categories.enum";
import {FoodStatuses} from "../../../enums/food-statuses.enum";
import {PromotionViewModel} from "../../../view-models/promotion.view-model";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {CityViewModel} from "../../../view-models/city/city.view-model";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {IDetailedFoodForm} from "../../../models/detailed-food-form.model";
import {FoodPromotionStatuses} from "../../../enums/food-promotion-statuses.enum";
import {IRegion} from "../../../interfaces/region.interface";
import {ImageItem} from "../../../models/image-item";

export interface IDetailedFoodScope extends IScope {

    //#region Properties

    initialDetailedFood: FoodViewModel;

    detailedFood: FoodViewModel;

    foodPhotos: ImageItem[];

    idToStates: {[id: string]: StateViewModel};

    idToCities: {[id: string]: CityViewModel};

    editorMode: EditorModes;

    editorModes: typeof EditorModes;

    promotionStatuses: typeof FoodPromotionStatuses;

    detailedFoodForm: IDetailedFoodForm;

    availableFoodStatuses: FoodStatuses[];

    availableFoodCategories: FoodCategories[];

    availableFoodTypes: FoodTypes[];

    availableFoodPromotionModes: FoodPromotionStatuses[];

    //#endregion

    //#region Methods

    loadFoodTypeTitle(foodType: FoodTypes): string;

    loadFoodCategoryTitle(foodCategory: FoodCategories): string;

    loadFoodStatusTitle(foodStatus: FoodStatuses): string;

    shouldPromotionValid(promotion: PromotionViewModel): boolean;

    shouldFoodAddable(): boolean;

    shouldFoodEditable(): boolean;

    clickEnableEditMode(): void;

    clickAddAssignedLocation(): void;

    clickDeleteAssignedLocation(assignedLocation: IRegion): void;

    clickAddFoodType(): void;

    clickDeleteFoodType(type: FoodTypes): void;

    clickSelectPromotionStartDate(): void;

    clickSelectPromotionEndDate(): void;

    clickCancelFoodEdit(): void;

    clickReplaceFoodPhoto(photoId: number): void;

    clickSubmitFoodEdit(): void;

    clickSubmitFoodAdd(): void;

    //#endregion
}
