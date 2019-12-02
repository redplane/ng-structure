import {IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {LoadPhrasesViewModel} from "../../view-models/phrase/load-phrases.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {LoadFoodViewModel} from "../../view-models/food/load-food.view-model";
import {PromotionViewModel} from "../../view-models/promotion.view-model";

export interface IFoodManagementScope extends IScope {

    //#region Properties

    loadFoodsResult: SearchResultViewModel<FoodViewModel>;

    loadFoodsCondition: LoadFoodViewModel;

    loadingFoods: boolean;

    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    shouldFoodsDisplayed(): boolean;

    clickReloadFoods(page?: number): void;

    clickEditFood(foodId: string): void;

    shouldPromotionValid(promotion: PromotionViewModel): boolean;

    clickAddFood(): void;

    //#endregion

}
