import {IFoodService} from "../interfaces/foods-service.interface";
import {LoadFoodVendorViewModel} from "../../view-models/user/load-food-vendor.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {FoodTypes} from "../../enums/food-types.enum";
import {FoodCategories} from "../../enums/food-categories.enum";
import {FoodStatuses} from "../../enums/food-statuses.enum";
import {PromotionViewModel} from "../../view-models/promotion.view-model";
import {FoodPromotionStatuses} from "../../enums/food-promotion-statuses.enum";

export class FoodsService implements IFoodService {

    //#region Constructor

    public constructor(protected $http: IHttpService, protected appSettings: IAppSettings) {

    }

    //#endregion

    //#region Methods

    public loadFoodsAsync(condition: LoadFoodVendorViewModel): IPromise<SearchResultViewModel<FoodViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/food/search`;
        return this.$http
            .post<SearchResultViewModel<FoodViewModel>>(fullUrl, condition)
            .then(m => m.data);
    }

    public loadFoodTypeTitle(foodType: FoodTypes): string {
        switch (foodType) {
            case FoodTypes.breakfast:
                return 'TITLE_BREAKFAST';

            case FoodTypes.lunch:
                return 'TITLE_LUNCH';

            case FoodTypes.dinner:
                return 'TITLE_DINNER';

            default:
                return '';
        }
    }

    public loadFoodCategoryTitle(foodCategory: FoodCategories): string {
        switch (foodCategory) {
            case FoodCategories.alacarte:
                return 'TITLE_ALACARTE';

            case FoodCategories.set:
                return 'TITLE_SET';

            default:
                return 'TITLE_ALL';
        }
    }

    public loadFoodStatusTitle(foodStatus: FoodStatuses): string {
        switch (foodStatus) {
            case FoodStatuses.available:
                return 'TITLE_AVAILABLE';

            default:
                return 'TITLE_UNAVAILABLE';
        }
    }

    public shouldPromotionValid(promotion: PromotionViewModel): boolean {

        if (!promotion) {
            return false;
        }

        if (promotion.status !== FoodPromotionStatuses.inPromotion) {
            return false;
        }

        const unixTime = new Date().getTime();
        if (unixTime < promotion.startTime || unixTime > promotion.endTime) {
            return false;
        }

        return true;
    }

    //#endregion
}
