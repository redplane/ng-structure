import {IController} from "angular";
import {RatingViewModel} from "../../../view-models/ratings/rating.view-model";
import {IDetailedRatingModalScope} from "./detailed-rating-modal.scope";
import {AddRatingViewModel} from "../../../view-models/ratings/add-rating.view-model";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";

export class DetailedRatingModalController implements IController {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(detailedRating: RatingViewModel,
                       protected $scope: IDetailedRatingModalScope,
                       protected $messageBus: INgRxMessageBusService) {

        if (!detailedRating) {
            this.$scope.initialDetailedRating = null;
        } else {
            this.$scope.initialDetailedRating = {...detailedRating};
        }

        this.$scope.clickAddEditRating = this._clickAddEditRating;
        this.$scope.clickCancel = this._clickCancel;
    }

    //#endregion

    //#region Methods

    protected _clickAddEditRating = (event: Event): void => {
        if (event) {
            event.preventDefault();
        }

        // In edit mode.
        const initialDetailedRating = this.$scope.detailedRating;
        if (initialDetailedRating && initialDetailedRating.id) {
            return;
        }

        // Form is not valid.
        if (!this.$scope.detailedRatingForm || !this.$scope.detailedRatingForm.$valid) {
            return;
        }
        const model = new AddRatingViewModel();
        model.name = this.$scope.detailedRating.name;
        this.$scope.$close(model);
    };

    protected _clickCancel = (): void => {
        this.$scope.$dismiss();
    }

    //#endregion

}