import {IPromise, IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {RatingViewModel} from "../../view-models/ratings/rating.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {LoadRatingsViewModel} from "../../view-models/ratings/load-ratings.view-model";

export interface IRatingManagementScope extends IScope {

    //#region Properties

    loadRatingsCondition: LoadRatingsViewModel;

    loadRatingsResult: SearchResultViewModel<RatingViewModel>;

    masterItemAvailabilities: typeof MasterItemAvailabilities;

    loadingRatings: boolean;

    //#endregion

    //#region Methods

    shouldRatingsDisplayed(): boolean;

    clickDisplayAddRatingModal(): void;

    clickReloadRatings(): void;

    clickDeleteRating(rating: RatingViewModel): void;

    //#endregion

}