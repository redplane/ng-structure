import {IController} from "angular";
import {ILocationPickerScope} from "./location-picker-modal.scope";
import {AddAssignedLocationModel} from "../../../models/add-assigned-location.model";
import {IStatesService} from "../../../services/interfaces/states-service.interface";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {ICitiesService} from "../../../services/interfaces/cities-service.interface";
import {LoadCitiesViewModel} from "../../../view-models/city/load-cities.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {CityViewModel} from "../../../view-models/city/city.view-model";

/* @ngInject */
export class LocationPickerModalController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: ILocationPickerScope,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService) {

        $scope.clickOk = this._clickOk;
        $scope.clickCancel = this._clickCancel;

        $scope.shouldStatesSelectionDisabled = this._shouldStatesSelectionDisabled;
        $scope.shouldCitiesSelectionDisabled = this._shouldCitiesSelectionDisabled;

        $scope
            .$watch('selectedStateId', this._clickReloadCities);
    }

    //#endregion

    //#region Methods

    public $onInit(): void {

        this.$states
            .loadWholeStatesAsync()
            .then((states: StateViewModel[]) => {
                this.$scope.availableStates = states;
            });
    };

    //#endregion

    //#region Internal methods

    protected _clickOk = (): void => {
        const availableStates = this.$scope.availableStates;
        const availableCities = this.$scope.availableCities;

        const availableState = availableStates.find(item => item.id == this.$scope.selectedStateId);
        const availableCity = availableCities.find(item => item.id == this.$scope.selectedCityId);

        const model = new AddAssignedLocationModel();
        model.stateId = availableState.id;
        model.cityId = availableCity.id;
        model.selectedState = availableState;
        model.selectedCity = availableCity;

        this.$scope.$close(model);
    };

    protected _clickCancel = (): void => {
        // Close the modal dialog.
        this.$scope.$dismiss('Manual closed');
    };

    protected _shouldStatesSelectionDisabled = (): boolean => {
        const availableStates = this.$scope.availableStates;
        return !availableStates;
    };

    protected _shouldCitiesSelectionDisabled = (): boolean => {
        const availableStates = this.$scope.availableStates;
        const availableCities = this.$scope.availableCities;
        return (!availableStates) || (!availableCities);
    };

    protected _clickReloadCities = (stateId: string): void => {

        if (!stateId) {
            return;
        }

        const loadCitiesConditions = new LoadCitiesViewModel();
        loadCitiesConditions.stateIds = [stateId];
        loadCitiesConditions.pager = new PagerViewModel();
        loadCitiesConditions.pager.page = 1;
        loadCitiesConditions.pager.records = ValidationValueConstant.maxSupportedSearchRecords;

        this.$cities
            .loadCitiesAsync(loadCitiesConditions)
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.availableCities = loadCitiesResult.items;
            });
    };

    //#endregion
}
