import {IController, IPromise} from "angular";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {ICityDetailScope} from "./city-detail.scope";
import {CityViewModel} from "../../../view-models/city/city.view-model";
import {AddCityViewModel} from "../../../view-models/city/add-city.view-model";
import {EditCityViewModel} from "../../../view-models/city/edit-city.view-model";
import {CityDetailFormViewModel} from "../../../view-models/city/city-detail-form.view-model";
import {StateViewModel} from "../../../view-models/state/state-view.model";
import {IStateService} from "../../../services/interfaces/state-service.interface";
import {LoadStatesViewModel} from "../../../view-models/state/load-states.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";

/* @ngInject */
export class CityDetailController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: ICityDetailScope,
                       protected $states: IStateService) {

        this.$scope.cityModel = new CityViewModel(null);

        const city = this.$scope.$resolve.city;
        if (city) {
            this.$scope.inEditMode = true;
            this.$scope.cityModel = <CityViewModel>city;
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

    private _loadAvailableStatesAsync = (): StateViewModel[] | IPromise<StateViewModel[]> => {

        // TODO: Load state by keyword.
        const loadStatesCondition = new LoadStatesViewModel();
        const pager = new PagerViewModel();
        pager.page = 1;
        pager.records = ValidationValueConstant.maxRecordsPerSearchPage;
        loadStatesCondition.pager = pager;

        return this.$states.loadStatesAsync(loadStatesCondition)
            .then((loadStatesResult: SearchResultViewModel<StateViewModel>) => {
                return loadStatesResult.items;
            });

    };

    /*
    * Called when component is initialized.
    * */
    public $onInit(): void {
        this._loadAvailableStatesAsync()
    }


    //#endregion
}
