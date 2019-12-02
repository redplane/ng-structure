import {IPromise} from "angular";
import {FoodTypes} from "../../../enums/food-types.enum";
import {FoodTypePickerModalController} from "./food-type-picker-modal.controller";

export class FoodTypePickerModalService {

    //#region Constructor

    public constructor(protected $uibModal: angular.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayFoodTypesPickerModalAsync(): IPromise<FoodTypes> {
        const modalInstance = this.$uibModal
            .open({
                template: () => require('./food-type-picker-modal.html'),
                controller: FoodTypePickerModalController,
                animation: true
            });

        return modalInstance
            .result
            .then(foodType => <FoodTypes> foodType);
    };

    //#endregion
}
