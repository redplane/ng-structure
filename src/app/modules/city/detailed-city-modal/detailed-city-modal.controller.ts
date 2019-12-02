import {IController} from "angular";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {ICityDetailScope} from "./detailed-city-modal.scope";
import {CityViewModel} from "../../../view-models/city/city.view-model";
import {AddCityViewModel} from "../../../view-models/city/add-city.view-model";
import {EditCityViewModel} from "../../../view-models/city/edit-city.view-model";
import {CityDetailFormViewModel} from "../../../view-models/city/city-detail-form.view-model";
import {KeyValueModel} from "../../../models/key-value.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {IStatesService} from "../../../services/interfaces/states-service.interface";

/* @ngInject */
export class DetailedCityModalController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: ICityDetailScope,
                       protected $states: IStatesService,
                       detailedCity: CityViewModel) {

        this.$scope.detailedCity = new CityViewModel(null);

        const availabilities = new Array<KeyValueModel<MasterItemAvailabilities>>();
        availabilities.push(new KeyValueModel<MasterItemAvailabilities>('TITLE_UNAVAILABLE', MasterItemAvailabilities.unavailable));
        availabilities.push(new KeyValueModel<MasterItemAvailabilities>('TITLE_AVAILABLE', MasterItemAvailabilities.available));
        this.$scope.availabilities = availabilities;
        this.$scope.editorModes = EditorModes;

        if (detailedCity) {
            this.$scope.editorMode = EditorModes.edit;
            this.$scope.detailedCity = <CityViewModel>{
                ...detailedCity
            };
            this.$scope.initialDetailedCity = <CityViewModel>{
                ...detailedCity
            }
        } else {
            this.$scope.editorMode = EditorModes.add;
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

        const model = this.$scope.detailedCity;

        if (this.$scope.editorMode == EditorModes.edit) {

            const editCityModel = new EditCityViewModel(model.id);

            // City name.
            editCityModel.name = new EditableFieldViewModel<string>();
            editCityModel.name.value = model.name;
            editCityModel.name.hasModified = cityForm.name.$dirty;

            editCityModel.availability = new EditableFieldViewModel<MasterItemAvailabilities>();
            editCityModel.availability.value = model.availability;
            editCityModel.availability.hasModified = cityForm.availability.$dirty;

            this.$scope.$close(editCityModel);

            return;
        }

        const addCityModel: AddCityViewModel = {
            ...model
        };

        this.$scope.$close(addCityModel);

    };

    /*
    * Called when component is initialized.
    * */
    public $onInit(): void {
        this.$states
            .loadWholeStatesAsync()
            .then(availableStates => this.$scope.availableStates = availableStates);
    }


    //#endregion
}
