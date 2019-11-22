import {IRatingsService} from "../interfaces/ratings-service.interface";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {RatingViewModel} from "../../view-models/ratings/rating.view-model";
import {LoadRatingsViewModel} from "../../view-models/ratings/load-ratings.view-model";
import {IHttpService, IPromise, IRequestShortcutConfig} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {AddRatingViewModel} from "../../view-models/ratings/add-rating.view-model";

export class RatingsService implements IRatingsService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {
    }

    //#endregion

    //#region Methods

    public loadRatingsAsync(conditions: LoadRatingsViewModel): IPromise<SearchResultViewModel<RatingViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/rating/search`;
        return this.$http
            .post<SearchResultViewModel<RatingViewModel>>(fullUrl, conditions)
            .then(loadRatingsResponse => loadRatingsResponse.data);
    }

    public addRatingAsync(model: AddRatingViewModel): IPromise<RatingViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/rating`;
        return this.$http
            .post<RatingViewModel>(fullUrl, model)
            .then(addRatingResponse => addRatingResponse.data);
    }

    public deleteRatingAsync(id: string): IPromise<void> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/rating/${id}`;
        return this.$http
            .delete(fullUrl)
            .then(() => void(0));
    }

    //#endregion
}
