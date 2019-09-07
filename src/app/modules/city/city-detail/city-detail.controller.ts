import {IController, IPromise} from "angular";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {ICityDetailScope} from "./city-detail.scope";
import {CityViewModel} from "../../../view-models/city/city.view-model";
import {AddCityViewModel} from "../../../view-models/city/add-city.view-model";
import {EditCityViewModel} from "../../../view-models/city/edit-city.view-model";
import {CityDetailFormViewModel} from "../../../view-models/city/city-detail-form.view-model";
import {KeyValueModel} from "../../../models/key-value.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

/* @ngInject */
export class CityDetailController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: ICityDetailScope) {

        this.$scope.cityModel = new CityViewModel(null);
        this.$scope.availableStates = this.$scope.$resolve.states;

        const availabilities = new Array<KeyValueModel<MasterItemAvailabilities>>();
        availabilities.push(new KeyValueModel<MasterItemAvailabilities>('Available', MasterItemAvailabilities.available));
        availabilities.push(new KeyValueModel<MasterItemAvailabilities>('Unavailable', MasterItemAvailabilities.unavailable));
        this.$scope.availabilities = availabilities;

        const city = this.$scope.$resolve.city;
        if (city) {
            this.$scope.inEditMode = true;
            this.$scope.cityModel = <CityViewModel>{
                ...city
            };
            this.$scope.originalCityModel = <CityViewModel>{
                ...city
            }
        }

        this.$scope.clickCancel = this._clickCancel;
        this.$scope.clickOk = this._clickOk;
    }

    //#endregion

    //#region Methods

    /*
    * Called when cancel is clicked.
    * */
    private _clickCancel = (): void => {
        this.$scope.$dismiss();
    };

    /*
    * Called when ok is clicked.
    * */
    private _clickOk = (cityForm: CityDetailFormViewModel): void => {

        const model = this.$scope.cityModel;

        if (!this.$scope.inEditMode) {
            const cityModel: AddCityViewModel = {
                ...model
            };

            this.$scope.$close(cityModel);
        }

        const editCityModel = new EditCityViewModel(model.id);

        // City name.
        editCityModel.name = new EditableFieldViewModel<string>();
        editCityModel.name.value = model.name;
        editCityModel.name.hasModified = cityForm.name.$dirty;

        this.$scope.$close(editCityModel);
    };

    /*
    * Called when component is initialized.
    * */
    public $onInit(): void {
    }


    //#endregion
}
