import {IController, IPromise, IQService} from "angular";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {IDetailedFoodScope} from "./detailed-food.scope";
import {IFoodService} from "../../../services/interfaces/foods-service.interface";
import {IStatesService} from "../../../services/interfaces/states-service.interface";
import {ICitiesService} from "../../../services/interfaces/cities-service.interface";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {PromotionViewModel} from "../../../view-models/promotion.view-model";
import {FoodPromotionStatuses} from "../../../enums/food-promotion-statuses.enum";
import {ILocationPickerModalsService} from "../../../services/interfaces/location-picker-modals-service.interface";
import {IRegion} from "../../../interfaces/region.interface";

export class DetailedFoodController implements IController {

    //#region Constructor

    public constructor(detailedFood: FoodViewModel,
                       protected $locationPickerModals: ILocationPickerModalsService,
                       protected $foods: IFoodService,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService,
                       protected $q: IQService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $scope: IDetailedFoodScope) {

        $scope.initialDetailedFood = {...detailedFood};
        $scope.detailedFood = {...detailedFood};
        if ($scope.detailedFood) {
            if (!$scope.detailedFood.promotion) {
                $scope.detailedFood.promotion = new PromotionViewModel();
                $scope.detailedFood.promotion.status = FoodPromotionStatuses.unavailable;
            }
        }

        const foodPhotos: string[] = [];
        for (let index = 0; index < 3; index++) {
            let photoUrl = 'https://via.placeholder.com/640x480';
            if (index < detailedFood.photos.length) {
                photoUrl = detailedFood.photos[index];
            }

            foodPhotos.push(photoUrl);
        }

        $scope.foodPhotos = foodPhotos;
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

        $scope.clickAddAssignedLocation = this._clickAddAssignedLocation;

        $scope.clickEnableEditMode = this._clickEnableEditMode;
        $scope.clickDeleteAssignedLocation = this._clickDeleteAssignedLocation;
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

        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        const loadItemsPromises: IPromise<any>[] = [];
        loadItemsPromises.push(this.$foods.loadAvailableFoodStatusesAsync());
        loadItemsPromises.push(this.$foods.loadAvailableFoodCategories());
        loadItemsPromises.push(this.$foods.loadAvailableFoodTypesAsync());
        loadItemsPromises.push(this.$foods.loadAvailableFoodPromotionModesAsync());

        this.$q.all(loadItemsPromises)
            .then((items: any[]) => {
                this.$scope.availableFoodStatuses = items[0];
                this.$scope.availableFoodCategories = items[1];
                this.$scope.availableFoodTypes = items[2];
                this.$scope.availableFoodPromotionModes = items[3];

                const model = this.$scope.detailedFood;
                this.$scope.editorMode = EditorModes.edit;
            })
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui,
                    MessageEventNameConstant.toggleFullScreenLoader, false);
            });

    };

    protected _clickAddAssignedLocation = (): void => {
        // Get the list of assigned location.
        let assignedLocations = [];
        if (this.$scope.detailedFood.assignedLocations) {
            assignedLocations = [...this.$scope.detailedFood.assignedLocations];
        }

        this.$locationPickerModals
            .displayLocationPickerModalAsync()
            .then(assignedLocation => {
                assignedLocations.push({stateId: assignedLocation.stateId, cityId: assignedLocation.cityId});
                this.$scope.detailedFood.assignedLocations = assignedLocations;
                this.$scope.idToStates[assignedLocation.stateId] = assignedLocation.selectedState;
                this.$scope.idToCities[assignedLocation.cityId] = assignedLocation.selectedCity;
                this.$scope.detailedFoodForm.assignedLocations.$setDirty();
                this.$scope.detailedFoodForm.$setDirty();
            });
    };

    protected _clickDeleteAssignedLocation = (assignedLocation: IRegion): void => {
        // Get the item index.
        const assignedLocations = [...this.$scope.detailedFood.assignedLocations];
        if (!assignedLocations) {
            return;
        }

        const itemIndex = assignedLocations.indexOf(assignedLocation);
        if (itemIndex < 0) {
            return;
        }

        assignedLocations.splice(itemIndex, 1);
        this.$scope.detailedFood.assignedLocations = assignedLocations;

        this.$scope.detailedFoodForm.$setDirty();
        this.$scope.detailedFoodForm.assignedLocations.$setDirty();
    };

    //#endregion
}
