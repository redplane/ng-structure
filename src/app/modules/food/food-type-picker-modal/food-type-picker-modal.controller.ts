import {IController} from "angular";
import {IFoodService} from "../../../services/interfaces/foods-service.interface";
import {IFoodTypePickerModalScope} from "./food-type-picker-modal.scope";

export class FoodTypePickerModalController implements IController {

    //#region Constructor

    public constructor(protected $foods: IFoodService,
                       protected $scope: IFoodTypePickerModalScope) {

        $scope.model = {selectedFoodType: null};
        $scope.clickSelectFoodType = this._clickSelectFoodType;
        $scope.clickDismissModal = this._clickDismissModal;

    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this.$foods.loadAvailableFoodTypesAsync()
            .then(items => {
                this.$scope.availableFoodTypes = items;
            });
    };

    protected _clickSelectFoodType = (): void => {
        this.$scope.$close(this.$scope.model.selectedFoodType);
    };

    protected _clickDismissModal = (): void => {
        this.$scope.$dismiss();
    };

    //#endregion
}
