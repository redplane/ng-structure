import {IScope} from "angular";
import {IModalScope} from "angular-ui-bootstrap";
import {FoodTypes} from "../../../enums/food-types.enum";
import {KeyValueModel} from "../../../models/key-value.model";

export interface IFoodTypePickerModalScope extends IScope, IModalScope {

    //#region Properties

    availableFoodTypes: KeyValueModel<FoodTypes>[];

    model: {selectedFoodType: FoodTypes};

    //#endregion

    //#region Methods

    clickSelectFoodType(): void;

    clickDismissModal(): void;

    //#endregion

}
