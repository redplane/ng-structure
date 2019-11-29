import {IController, IQService} from "angular";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {IDetailedFoodScope} from "./detailed-food.scope";
import {IFoodService} from "../../../services/interfaces/foods-service.interface";
import {IStatesService} from "../../../services/interfaces/states-service.interface";
import {ICitiesService} from "../../../services/interfaces/cities-service.interface";
import {EditorModes} from "../../../enums/edit-modes.enum";

export class DetailedFoodController implements IController {

    //#region Constructor

    public constructor(detailedFood: FoodViewModel,
                       protected $foods: IFoodService,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService,
                       protected $q: IQService,
                       protected $scope: IDetailedFoodScope) {

        const foodPhotos: string[] = [];
        for (let index = 0; index < 3; index++) {
            let photoUrl = 'https://via.placeholder.com/640x480';
            if (index < detailedFood.photos.length) {
                photoUrl = detailedFood.photos[index];
            }

            foodPhotos.push(photoUrl);
        }

        $scope.foodPhotos = foodPhotos;
        $scope.detailedFood = detailedFood;
        $scope.idToCities = {};
        $scope.idToStates = {};
        $scope.editorModes = EditorModes;
        $scope.editorMode = EditorModes.view;

        $scope.loadFoodTypeTitle = $foods.loadFoodTypeTitle;
        $scope.loadFoodCategoryTitle = $foods.loadFoodCategoryTitle;
        $scope.loadFoodStatusTitle = $foods.loadFoodStatusTitle;
        $scope.shouldPromotionValid = $foods.shouldPromotionValid;
        $scope.shouldFoodAddable = this._shouldFoodAddable;
        $scope.shouldFoodEditable = this._shouldFoodEditable;

        $scope.clickEnableEditMode = this._clickEnableEditMode;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._loadAssignedLocations(this.$scope.detailedFood);
    }

    //#endregion

    //#region Internal methods

    private _loadAssignedLocations = (detailedFood: FoodViewModel): void => {

        // Get the list of assigned locations.
        const assignedLocations = detailedFood.assignedLocations;
        const stateIds: string[] = [];
        const cityIds: string[] = [];

        for (const assignedLocation of assignedLocations) {
            stateIds.push(assignedLocation.stateId);
            cityIds.push(assignedLocation.cityId);
        }

        const loadStatesPromise = this.$states
            .loadStatesByIdsAsync(stateIds);

        const loadCitiesPromise = this.$cities
            .loadCitiesByIdsAsync(cityIds);

        this.$q.all([loadStatesPromise, loadCitiesPromise])
            .then((items: any[]) => {
               this.$scope.idToStates = items[0];
               this.$scope.idToCities = items[1];
               console.log(items);
            });
    };

    protected _shouldFoodAddable = (): boolean => {
        const detailedFood = this.$scope.detailedFood;
        return (!detailedFood || !detailedFood.id);
    };

    protected _shouldFoodEditable = (): boolean => {
        const detailedFood = this.$scope.detailedFood;
        return (detailedFood && detailedFood.id !== null);
    };

    protected _clickEnableEditMode = (): void => {
        if (!this._shouldFoodEditable()) {
            return;
        }

        if (this.$scope.editorMode == EditorModes.edit) {
            return;
        }

        this.$scope.editorMode = EditorModes.edit;
    };

    //#endregion
}
