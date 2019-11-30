import {IController, IQService} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUsersService} from "../../../../../services/interfaces/user-service.interface";
import {IVendorPreferredLocationScope} from "./vendor-preferred-location.scope";
import {IRegion} from "../../../../../interfaces/region.interface";
import {UserRoles} from "../../../../../enums/user-roles.enum";
import {IAppSettings} from "../../../../../interfaces/app-setting.interface";
import {IStatesService} from "../../../../../services/interfaces/states-service.interface";
import {ICitiesService} from "../../../../../services/interfaces/cities-service.interface";
import {LocationPickerModalsService} from "../../../../shared/location-picker-modal/location-picker-modals.service";
import {AddAssignedLocationModel} from "../../../../../models/add-assigned-location.model";
import {EditableFieldViewModel} from "../../../../../view-models/editable-field.view-model";
import {INgRxMessageBusService} from "../../../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../../../constants/message-event-name.constant";
import {IFoodDeliveryVendor} from "../../../../../interfaces/food-delivery-vendor.interface";
import {EditFoodDeliveryVendorModel} from "../../../../../models/edit-food-delivery-vendor.model";

/* @ngInject */
export class VendorPreferredLocationController implements IController {

    //#region Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected $users: IUsersService,
                       protected $scope: IVendorPreferredLocationScope,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService,
                       protected $q: IQService,
                       protected $locationPickerModals: LocationPickerModalsService,
                       protected $messageBus: INgRxMessageBusService,
                       protected appSettings: IAppSettings) {
        $scope.detailedUser = detailedUser;
        $scope.loadPreferredLocations = this._loadPreferredLocations;
        $scope.clickAddPreferredLocation = this._clickAddPreferredLocation;
        $scope.clickDeleteAssignedLocation = this._clickDeleteAssignedLocation;
        $scope.clickUpdateAssignedLocations = this._clickUpdateAssignedLocations;

        $scope.idToState = {};
        $scope.idToCity = {};
    }

    //#endregion

    //#region Methods

    // Called when component is initialized.
    public $onInit(): void {

        // Load list of assigned locations.
        const preferredLocations = this._loadPreferredLocations();
        this.$scope.preferredLocations = [...preferredLocations];

        const stateIds: string[] = [];
        const cityIds: string[] = [];

        // Mark assigned locations to be loaded.
        this.$scope.loadingPreferredLocations = true;

        for (const assignedLocation of preferredLocations) {
            stateIds.push(assignedLocation.stateId);
            cityIds.push(assignedLocation.cityId);
        }

        const loadStatesPromise = this.$states
            .loadStatesByIdsAsync(stateIds);

        const loadCitiesPromise = this.$cities
            .loadCitiesByIdsAsync(cityIds);

        this.$q.all([loadStatesPromise, loadCitiesPromise])
            .then((loadInitialItemsResults: any[]) => {
               this.$scope.idToState = loadInitialItemsResults[0];
               this.$scope.idToCity = loadInitialItemsResults[1];
            })
            .finally(() => {
                this.$scope.loadingPreferredLocations = false;
            });
    }

    //#endregion

    //#region Internal methods

    protected _loadPreferredLocations = (): IRegion[] => {
        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return [];
        }

        const vendor = detailedUser.vendor;
        if (!this.$users.hasRoles(detailedUser.roles, [UserRoles.foodDeliveryVendor])) {
            return [];
        }

        const foodVendor = <IFoodDeliveryVendor> vendor;
        if (!foodVendor.preferredLocations) {
            return [];
        }

        return foodVendor.preferredLocations;
    };

    protected _clickAddPreferredLocation = (): void => {
        this.$locationPickerModals
            .displayLocationPickerModalAsync()
            .then((addAssignedLocationResult: AddAssignedLocationModel) => {

                // Check whether location has been added to the list or not.
                const index = this.$scope.preferredLocations.findIndex(item => item.stateId == addAssignedLocationResult.stateId);
                if (index !== -1)
                    return;

                // Update cache items.
                this.$scope.idToState[addAssignedLocationResult.stateId] = addAssignedLocationResult.selectedState;
                this.$scope.idToCity[addAssignedLocationResult.cityId] = addAssignedLocationResult.selectedCity;

                const item: IRegion = {
                    cityId: addAssignedLocationResult.cityId,
                    stateId: addAssignedLocationResult.stateId
                };

                this.$scope.preferredLocations
                    .push(item);
            });
    };

    protected _clickDeleteAssignedLocation = (item: IRegion): void => {

        // Find the item index.
        const itemIndex = this.$scope
            .preferredLocations
            .indexOf(item);

        if (itemIndex < 0)
            return;

        this.$scope
            .preferredLocations
            .splice(itemIndex, 1);
    };

    protected _clickUpdateAssignedLocations = (): void => {

        const model = new EditFoodDeliveryVendorModel();
        model.preferredLocations = new EditableFieldViewModel<IRegion[]>(this.$scope.preferredLocations, true);

        // Display loading indicator.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$users
            .editFoodDeliveryVendorAsync(this.$scope.detailedUser.id, model)
            .then((vendor: IFoodDeliveryVendor) => {
                this.$scope.preferredLocations = vendor.preferredLocations;
            })
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });

    };


    //#endregion

}
