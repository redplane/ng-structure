import {IFoodService} from "../interfaces/foods-service.interface";
import {LoadFoodVendorViewModel} from "../../view-models/user/load-food-vendor.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {FoodViewModel} from "../../view-models/food/food.view-model";
import {IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";

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

    //#endregion
}
