import {LoadRatingsViewModel} from "../../view-models/ratings/load-ratings.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {RatingViewModel} from "../../view-models/ratings/rating.view-model";
import {IPromise} from "angular";
import {AddRatingViewModel} from "../../view-models/ratings/add-rating.view-model";

export interface IRatingsService {

    //#region Methods

    addRatingAsync(model: AddRatingViewModel): IPromise<RatingViewModel>;

    deleteRatingAsync(id: string): IPromise<void>;

    loadRatingsAsync(conditions: LoadRatingsViewModel): IPromise<SearchResultViewModel<RatingViewModel>>;

    //#endregion

}
