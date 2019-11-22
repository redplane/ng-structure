import {RatingViewModel} from "../../../view-models/ratings/rating.view-model";
import {IFormController, IScope} from "angular";

export interface IDetailedRatingModalScope extends IScope, ng.ui.bootstrap.IModalScope {

    //#region Properties

    detailedRating: RatingViewModel;

    initialDetailedRating: RatingViewModel;

    detailedRatingForm: IFormController;

    //#endregion

    //#region Methods

    clickAddEditRating(event: Event): void;

    clickCancel(): void;

    //#endregion
}