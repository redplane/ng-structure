import {IFoodService} from "../interfaces/foods-service.interface";
import {LoadFoodVendorViewModel} from "../../view-models/user/load-food-vendor.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {IHttpService, IPromise, IQService} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {FoodTypes} from "../../enums/food-types.enum";
import {FoodCategories} from "../../enums/food-categories.enum";
import {FoodStatuses} from "../../enums/food-statuses.enum";
import {PromotionViewModel} from "../../view-models/promotion.view-model";
import {FoodPromotionStatuses} from "../../enums/food-promotion-statuses.enum";
import {KeyValueModel} from "../../models/key-value.model";
import {EditFoodViewModel} from "../../view-models/food/edit-food.view-model";
import {AddFoodViewModel} from "../../view-models/food/add-food.view-model";

export class FoodsService implements IFoodService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected $q: IQService,
                       protected appSettings: IAppSettings) {

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

    public loadAvailableFoodCategories(): IPromise<KeyValueModel<FoodCategories>[]> {
        const availableFoodCategories: KeyValueModel<FoodCategories>[] = [];
        availableFoodCategories.push(new KeyValueModel<FoodCategories>('TITLE_ALL', FoodCategories.all));
        availableFoodCategories.push(new KeyValueModel<FoodCategories>('TITLE_ALACARTE', FoodCategories.alacarte));
        availableFoodCategories.push(new KeyValueModel<FoodCategories>('TITLE_SET', FoodCategories.set));

        return this.$q.resolve(availableFoodCategories);
    }

    public loadAvailableFoodPromotionModesAsync(): IPromise<KeyValueModel<FoodPromotionStatuses>[]> {
        const availableFoodPromotionModes: KeyValueModel<FoodPromotionStatuses>[] = [];
        availableFoodPromotionModes.push(new KeyValueModel<FoodPromotionStatuses>('TITLE_UNAVAILABLE', FoodPromotionStatuses.unavailable));
        availableFoodPromotionModes.push(new KeyValueModel<FoodPromotionStatuses>('TITLE_IN_PROMOTION', FoodPromotionStatuses.inPromotion));

        return this.$q.resolve(availableFoodPromotionModes);
    }

    public loadAvailableFoodStatusesAsync(): IPromise<KeyValueModel<FoodStatuses>[]> {
        const availableFoodStatuses: KeyValueModel<FoodStatuses>[] = [];
        availableFoodStatuses.push(new KeyValueModel<FoodStatuses>('TITLE_AVAILABLE', FoodStatuses.available));
        availableFoodStatuses.push(new KeyValueModel<FoodStatuses>('TITLE_UNAVAILABLE', FoodStatuses.unavailable));
        return this.$q.resolve(availableFoodStatuses);
    }

    public loadAvailableFoodTypesAsync(): IPromise<KeyValueModel<FoodTypes>[]> {
        const availableFoodTypes: KeyValueModel<FoodTypes>[] = [];
        availableFoodTypes.push(new KeyValueModel<FoodTypes>('TITLE_BREAKFAST', FoodTypes.breakfast));
        availableFoodTypes.push(new KeyValueModel<FoodTypes>('TITLE_LUNCH', FoodTypes.lunch));
        availableFoodTypes.push(new KeyValueModel<FoodTypes>('TITLE_DINNER', FoodTypes.dinner));

        return this.$q.resolve(availableFoodTypes);
    }

    public editFoodPhotoAsync(foodId: string, photoIndex: number, photo: Blob): IPromise<string> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/food/photo/${foodId}`;
        const data = new FormData();
        data.append('index', `${photoIndex}`);
        data.append('photo', photo);

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        return this.$http
            .put<string>(fullUrl, data, httpRequestOptions)
            .then(m => m.data);
    }

    public editFoodAsync(foodId: string, model: EditFoodViewModel): IPromise<FoodViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/food/${foodId}`;

        const data = new FormData();
        const validKeys = ['name', 'status', 'price',
            'category', 'types', 'description', 'ingredient',
            'assignedLocations', 'minimumOrderedQuantity'];

        for (const validKey of validKeys) {
            if (!model[validKey] || !model[validKey].hasModified) {
                continue;
            }

            data.append(`${validKey}[value]`, model[validKey].value);
            data.append(`${validKey}[hasModified]`, model[validKey].hasModified);
        }

        const promotion = model.promotion;
        if (promotion && promotion.hasModified) {
            data.append('promotion[value][startTime]', `${promotion.value.startTime}`);
            data.append('promotion[value][endTime]', `${promotion.value.endTime}`);
            data.append('promotion[value][status]', `${promotion.value.status}`);
            data.append('promotion[value][discountPrice]', `${promotion.value.discountPrice}`);
        }

        data.append('hasPromotion[value]', `${model.hasPromotion.value}`);
        data.append('hasPromotion[hasModified]', 'true');

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        return this.$http
            .put<FoodViewModel>(fullUrl, data, httpRequestOptions)
            .then(m => m.data);
    }

    public addFoodAsync(model: AddFoodViewModel): IPromise<FoodViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/food`;

        const data = new FormData();
        const validKeys = ['name', 'status', 'price',
            'category', 'types', 'description', 'ingredient',
            'assignedLocations', 'minimumOrderedQuantity'];

        for (const validKey of validKeys) {
            data.append(`${validKey}`, `${model[validKey]}`);
        }

        const promotion = model.promotion;
        if (model.hasPromotion) {
            data.append('promotion[startTime]', `${promotion.startTime}`);
            data.append('promotion[endTime]', `${promotion.endTime}`);
            data.append('promotion[status]', `${promotion.status}`);
            data.append('promotion[discountPrice]', `${promotion.discountPrice}`);
        }

        data.append('hasPromotion', `${model.hasPromotion}`);

        const photos = model.photos;
        if (photos && photos.length) {
            for (const photo of photos) {
                data.append('photos', photo);
            }
        }

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        return this.$http
            .post<FoodViewModel>(fullUrl, data, httpRequestOptions)
            .then(m => {
                if (m.status !== 200) {
                    return this.$q
                        .reject(m.statusText);
                }
                return m.data;
            });
    }

    //#endregion
}
