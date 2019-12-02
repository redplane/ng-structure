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
import {FoodTypePickerModalService} from "../food-type-picker-modal/food-type-picker-modal.service";
import {DateTimePickerModalsService} from "../../shared/datetime-picker-modal/date-time-picker-modals.service";
import {PhotoCropperModalService} from "../../shared/photo-cropper-modal/photo-cropper-modal.service";
import {EditFoodViewModel} from "../../../view-models/food/edit-food.view-model";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {FoodTypes} from "../../../enums/food-types.enum";
import {FoodStatuses} from "../../../enums/food-statuses.enum";
import {FoodCategories} from "../../../enums/food-categories.enum";
import {ImageItem} from "../../../models/image-item";
import {AddFoodViewModel} from "../../../view-models/food/add-food.view-model";
import {IFilesService} from "../../../services/interfaces/files-service.interface";
import { StateService } from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";

export class DetailedFoodController implements IController {

    //#region Constructor

    public constructor(detailedFood: FoodViewModel,
                       protected $locationPickerModals: ILocationPickerModalsService,
                       protected $foods: IFoodService,
                       protected $states: IStatesService,
                       protected $state: StateService,
                       protected $cities: ICitiesService,
                       protected $q: IQService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $foodTypePickerModals: FoodTypePickerModalService,
                       protected $dateTimePickerModals: DateTimePickerModalsService,
                       protected $files: IFilesService,
                       protected $scope: IDetailedFoodScope,
                       protected $photoCropperModals: PhotoCropperModalService) {

        $scope.initialDetailedFood = {...detailedFood};

        $scope.idToCities = {};
        $scope.idToStates = {};
        $scope.editorModes = EditorModes;
        $scope.editorMode = EditorModes.view;
        $scope.promotionStatuses = FoodPromotionStatuses;

        this._reloadDetailedFoodModel(detailedFood);

        $scope.loadFoodTypeTitle = $foods.loadFoodTypeTitle;
        $scope.loadFoodCategoryTitle = $foods.loadFoodCategoryTitle;
        $scope.loadFoodStatusTitle = $foods.loadFoodStatusTitle;
        $scope.shouldPromotionValid = $foods.shouldPromotionValid;
        $scope.shouldFoodAddable = this._shouldFoodAddable;
        $scope.shouldFoodEditable = this._shouldFoodEditable;

        $scope.clickAddAssignedLocation = this._clickAddAssignedLocation;

        $scope.clickEnableEditMode = this._clickEnableEditMode;
        $scope.clickDeleteAssignedLocation = this._clickDeleteAssignedLocation;
        $scope.clickAddFoodType = this._clickAddFoodType;
        $scope.clickDeleteFoodType = this._clickDeleteFoodType;
        $scope.clickSelectPromotionStartDate = this._clickSelectPromotionStartDate;
        $scope.clickSelectPromotionEndDate = this._clickSelectPromotionEndDate;
        $scope.clickCancelFoodEdit = this._clickCancelFoodEdit;
        $scope.clickSubmitFoodEdit = this._clickSubmitFoodEdit;
        $scope.clickSubmitFoodAdd = this._clickSubmitFoodAdd;
        $scope.clickReplaceFoodPhoto = this._clickReplaceFoodPhoto;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {

        this._loadAssignedLocations(this.$scope.detailedFood);

        if (this._shouldFoodAddable()) {
            this._loadInitialItemsAsync();
        }

    }

    //#endregion

    //#region Internal methods

    private _loadAssignedLocations = (detailedFood: FoodViewModel): void => {

        if (!detailedFood) {
            return;
        }

        // Get the list of assigned locations.
        const assignedLocations = detailedFood.assignedLocations;
        if (!assignedLocations || !assignedLocations.length) {
            return;
        }

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
            });
    };

    protected _shouldFoodAddable = (): boolean => {
        const detailedFood = this.$scope.detailedFood;
        return (!detailedFood || !detailedFood.id);
    };

    protected _shouldFoodEditable = (): boolean => {
        const detailedFood = this.$scope.detailedFood;
        return (detailedFood && detailedFood.id != null && detailedFood.id.length > 0);
    };

    protected _clickEnableEditMode = (): void => {
        if (!this._shouldFoodEditable()) {
            return;
        }

        if (this.$scope.editorMode == EditorModes.edit) {
            return;
        }

        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this._loadInitialItemsAsync()
            .then(() => {
                this.$scope.editorMode = EditorModes.edit;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
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

    protected _clickAddFoodType = (): void => {
        this.$foodTypePickerModals
            .displayFoodTypesPickerModalAsync()
            .then(foodType => {

                // Get food types.
                let foodTypes = this.$scope.detailedFood.types;
                if (!foodTypes) {
                    foodTypes = [];
                }

                const itemIndex = foodTypes.indexOf(foodType);
                if (itemIndex >= 0) {
                    return;
                }

                foodTypes.push(foodType);
                this.$scope.detailedFood.types = foodTypes;
                this.$scope.detailedFoodForm.types.$setDirty();
                this.$scope.detailedFoodForm.$setDirty();
            });
    };

    protected _clickDeleteFoodType = (type: FoodTypes): void => {

        // Get detailed food.
        const detailedFood = this.$scope.detailedFood;
        if (!detailedFood) {
            return;
        }

        const foodTypes = [].concat(detailedFood.types);
        if (!foodTypes) {
            return;
        }

        const itemIndex = foodTypes.indexOf(type);
        if (itemIndex < 0) {
            return;
        }

        foodTypes.splice(itemIndex, 1);
        this.$scope.detailedFood.types = foodTypes;
        this.$scope.detailedFoodForm.types.$setDirty();
        this.$scope.detailedFoodForm.$setDirty();
    };

    protected _clickSelectPromotionStartDate = (): void => {
        this.$dateTimePickerModals
            .displayDateTimePickerModalAsync()
            .then(selectedTime => {
                this.$scope.detailedFood.promotion.startTime = selectedTime;
                this.$scope.detailedFoodForm.promotionStartTime.$setDirty();
                this.$scope.detailedFoodForm.$setDirty();
            });
    };

    protected _clickSelectPromotionEndDate = (): void => {
        this.$dateTimePickerModals
            .displayDateTimePickerModalAsync()
            .then(selectedTime => {
                this.$scope.detailedFood.promotion.endTime = selectedTime;
                this.$scope.detailedFoodForm.promotionEndTime.$setDirty();
                this.$scope.detailedFoodForm.$setDirty();
            });
    };

    protected _clickCancelFoodEdit = (): void => {
        if (this.$scope.editorMode != EditorModes.edit) {
            return;
        }

        this.$scope.editorMode = EditorModes.view;
        return;
    };

    protected _clickSubmitFoodEdit = (): void => {
        if (this.$scope.editorMode != EditorModes.edit) {
            return;
        }

        if (!this.$scope.detailedFoodForm.$valid || !this.$scope.detailedFoodForm.$dirty) {
            return;
        }

        // Get detailed food.
        const detailedFood = this.$scope.detailedFood;
        const detailedFoodForm = this.$scope.detailedFoodForm;
        const promotion = detailedFood.promotion;

        // Initialize model.
        const editFoodModel = new EditFoodViewModel();
        editFoodModel.name = new EditableFieldViewModel<string>(detailedFood.name, true);
        editFoodModel.price = new EditableFieldViewModel<number>(detailedFood.price, true);
        editFoodModel.description = new EditableFieldViewModel<string>(detailedFood.description, true);
        editFoodModel.ingredient = new EditableFieldViewModel<string>(detailedFood.ingredient, true);
        editFoodModel.types = new EditableFieldViewModel<FoodTypes[]>(detailedFood.types, true);
        editFoodModel.status = new EditableFieldViewModel<FoodStatuses>(detailedFood.status, true);
        editFoodModel.category = new EditableFieldViewModel<FoodCategories>(detailedFood.category, true);
        editFoodModel.assignedLocations = new EditableFieldViewModel<IRegion[]>(detailedFood.assignedLocations, true);
        editFoodModel.minimumOrderedQuantity = new EditableFieldViewModel<number>(detailedFood.minimumOrderQuantity, true);
        editFoodModel.promotion = new EditableFieldViewModel<PromotionViewModel>(detailedFood.promotion, true);

        if (promotion && promotion.status == FoodPromotionStatuses.unavailable) {
            editFoodModel.hasPromotion = new EditableFieldViewModel<boolean>(false, true);
        } else {
            editFoodModel.hasPromotion = new EditableFieldViewModel<boolean>(true, true);
        }

        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$foods
            .editFoodAsync(detailedFood.id, editFoodModel)
            .then(editedFood => {
                this._reloadDetailedFoodModel(editedFood);
            })
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickReplaceFoodPhoto = (photoIndex: number): void => {

        const detailedFood = this.$scope.detailedFood;

        this.$photoCropperModals
            .displayPhotoCropperModalAsync(null, {
                aspectRatio: 4/3,
                viewMode: 2
            })
            .then(photo => {
                // Display loading message.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

                let loadImageUrlPromise: IPromise<string>;

                if (this._shouldFoodEditable()) {
                    loadImageUrlPromise = this.$foods
                        .editFoodPhotoAsync(detailedFood.id, photoIndex, photo);
                } else {
                    loadImageUrlPromise = this.$files
                        .blobToDataUrlAsync(photo);
                }

                loadImageUrlPromise
                    .then(photoUrl => {
                        const photos = [...this.$scope.foodPhotos];
                        photos[photoIndex] = new ImageItem(photoUrl,  photo);
                        this.$scope.foodPhotos = photos;
                        this.$scope.detailedFood.photos = photos.map(x => x.preview);
                    })
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    })
            });
    };

    protected _reloadDetailedFoodModel = (initialDetailedFood: FoodViewModel): void => {

        const detailedFood = {...initialDetailedFood};
        this.$scope.detailedFood = {...detailedFood};

        if (this._shouldFoodEditable()) {
            if (!this.$scope.detailedFood.promotion) {
                this.$scope.detailedFood.promotion = new PromotionViewModel();
                this.$scope.detailedFood.promotion.status = FoodPromotionStatuses.unavailable;
            }
        } else {
            this.$scope.detailedFood.name = '';
            this.$scope.detailedFood.price = 0;
            this.$scope.detailedFood.description = '';
            this.$scope.detailedFood.ingredient = '';
            this.$scope.detailedFood.types = [];
            this.$scope.detailedFood.status = null;
            this.$scope.detailedFood.category = null;
            this.$scope.detailedFood.minimumOrderQuantity = 1;

            const promotion = new PromotionViewModel();
            promotion.status = FoodPromotionStatuses.unavailable;
            this.$scope.detailedFood.promotion = promotion;

            this.$scope.editorMode = EditorModes.add;
        }

        const foodPhotos: ImageItem[] = [];
        for (let index = 0; index < 3; index++) {
            let photoUrl = 'https://via.placeholder.com/640x480';
            if (detailedFood && detailedFood.photos && (index < detailedFood.photos.length)) {
                const detailedFoodPhoto = detailedFood.photos[index];
                if (detailedFoodPhoto) {
                    photoUrl = detailedFoodPhoto;
                }
            }

            foodPhotos.push(new ImageItem(photoUrl, null));
        }

        this.$scope.foodPhotos = foodPhotos;
    };

    protected _clickSubmitFoodAdd = (): void => {

        // Not in add mode.
        if (this.$scope.editorMode != EditorModes.add) {
            return;
        }

        // Form is invalid.
        if (!this.$scope.detailedFoodForm.$valid || !this.$scope.detailedFoodForm.$dirty) {
            return;
        }

        // Get detailed food.
        const detailedFood = this.$scope.detailedFood;
        const detailedFoodForm = this.$scope.detailedFoodForm;
        const promotion = detailedFood.promotion;

        // Initialize model.
        const addFoodModel = new AddFoodViewModel();
        addFoodModel.name = detailedFood.name;
        addFoodModel.price = detailedFood.price;
        addFoodModel.description = detailedFood.description;
        addFoodModel.ingredient = detailedFood.ingredient;
        addFoodModel.types = detailedFood.types;
        addFoodModel.status = detailedFood.status;
        addFoodModel.category = detailedFood.category;
        addFoodModel.assignedLocations = detailedFood.assignedLocations;
        addFoodModel.minimumOrderedQuantity = detailedFood.minimumOrderQuantity;
        addFoodModel.promotion = detailedFood.promotion;

        addFoodModel.hasPromotion = (promotion && promotion.status !== FoodPromotionStatuses.unavailable);
        addFoodModel.photos = this.$scope.foodPhotos
            .filter(x => x.blob)
            .map(x => x.blob);

        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$foods
            .addFoodAsync(addFoodModel)
            .then(addedFood => {
                // Redirect user to foods listing page.
                return this.$state.go(UrlStatesConstant.foodManagementModuleName);
            })
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _loadInitialItemsAsync = (): IPromise<void> => {

        const loadItemsPromises: IPromise<any>[] = [];
        loadItemsPromises.push(this.$foods.loadAvailableFoodStatusesAsync());
        loadItemsPromises.push(this.$foods.loadAvailableFoodCategories());
        loadItemsPromises.push(this.$foods.loadAvailableFoodTypesAsync());
        loadItemsPromises.push(this.$foods.loadAvailableFoodPromotionModesAsync());

        return this.$q.all(loadItemsPromises)
            .then((items: any[]) => {
                this.$scope.availableFoodStatuses = items[0];
                this.$scope.availableFoodCategories = items[1];
                this.$scope.availableFoodTypes = items[2];
                this.$scope.availableFoodPromotionModes = items[3];

                return void(0);
            });

    };
    //#endregion
}
