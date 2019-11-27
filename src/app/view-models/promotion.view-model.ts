import {FoodPromotionStatuses} from "../enums/food-promotion-statuses.enum";

export class PromotionViewModel {

    //#region Properties

    public discountPrice: number;

    public startTime: number;

    public endTime: number;

    public status: FoodPromotionStatuses;

    //#endregion

}
