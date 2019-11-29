import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUsersService} from "../../../../../services/interfaces/user-service.interface";
import {IDetailedFoodVendorScope} from "./detailed-food-delivery-vendor.scope";
import {AddressViewModel} from "../../../../../view-models/address.view-model";
import {IAppSettings} from "../../../../../interfaces/app-setting.interface";
import {ICoordinate} from "../../../../../interfaces/coordinate.interface";
import {UserRoles} from "../../../../../enums/user-roles.enum";
import {EditFoodVendorViewModel} from "../../../../../view-models/user/edit-food-vendor.view-model";
import {EditableFieldViewModel} from "../../../../../view-models/editable-field.view-model";
import {IBank} from "../../../../../interfaces/bank.interface";
import {IAddress} from "../../../../../interfaces/address.interface";
import {IStatesService} from "../../../../../services/interfaces/states-service.interface";
import {SearchResultViewModel} from "../../../../../view-models/search-result.view-model";
import {StateViewModel} from "../../../../../view-models/states/state-view.model";
import {ICitiesService} from "../../../../../services/interfaces/cities-service.interface";
import {LoadCitiesViewModel} from "../../../../../view-models/city/load-cities.view-model";
import {PagerViewModel} from "../../../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../../../constants/validation-value.constant";
import {CityViewModel} from "../../../../../view-models/city/city.view-model";
import {IFoodVendor} from "../../../../../interfaces/food-vendor.interface";
import {INgRxMessageBusService} from "../../../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../../../constants/message-event-name.constant";
import {EditFoodDeliveryVendorModel} from "../../../../../models/edit-food-delivery-vendor.model";
import {IVehicle} from "../../../../../interfaces/vehicle.interface";
import {IFoodDeliveryVendor} from "../../../../../interfaces/food-delivery-vendor.interface";

/* @ngInject */
export class DetailedFoodDeliveryVendorController implements IController {

    //#regon Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected appSettings: IAppSettings,
                       protected $users: IUsersService,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $scope: IDetailedFoodVendorScope) {

        $scope.detailedUser = detailedUser;
        $scope.loadAddressDisplay = this._loadAddressDisplay;
        $scope.loadGMapUrl = () => appSettings.gMapUrl;
        $scope.loadAddressCoordinate = (coordinate: ICoordinate) => `${coordinate.latitude}, ${coordinate.longitude}`;
        $scope.shouldBankDisplayed = this._shouldBankDisplayed;

        $scope.editVendorModel = new EditFoodDeliveryVendorModel();
        $scope.clickEditDetailedFoodDeliveryVendor = this._clickEditDetailedFoodDeliveryVendor;
        $scope.shouldCitiesSelectionDisabled = this._shouldCitiesSelectionDisabled;
        $scope.clickCancelEditFoodVendor = this._clickCancelEditFoodVendor;
        $scope.clickUpdateFoodDeliveryVendor = this._clickUpdateFoodDeliveryVendor;
        $scope.loadingAvailableCities = false;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {

        this.$states
            .loadWholeStatesAsync()
            .then((states: StateViewModel[]) => {
                this.$scope.availableStates = states;
            });

        this.$scope.$watch('editVendorModel.address.value.stateId', this._clickReloadCities);
    }

    //#endregion

    //#region Internal methods

    protected _loadAddressDisplay = (address: AddressViewModel): string => {
        const items = [address.auxiliaryAddress, address.addressText, address.postalCode, address.cityName, address.stateName];
        return items
            .filter(item => item && item.length)
            .join(",");
    };

    protected _shouldBankDisplayed = (): boolean => {
        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodVendor]);
    };

    protected _clickEditDetailedFoodDeliveryVendor = (): void => {
        let editingVendorProfile = this.$scope.editingVendorProfile;
        const vendor = <IFoodDeliveryVendor>this.$scope.detailedUser.vendor;

        if (!editingVendorProfile) {
            const model = new EditFoodDeliveryVendorModel();
            model.name = new EditableFieldViewModel<string>(vendor.name, false);
            model.icNo = new EditableFieldViewModel<string>(vendor.icNo, false);
            model.phoneNo = new EditableFieldViewModel<string>(vendor.phoneNo, false);
            model.address = new EditableFieldViewModel<IAddress>(vendor.address, false);
            model.vehicle = new EditableFieldViewModel<IVehicle>(vendor.vehicle, false);

            this.$scope.editVendorModel = model;
            this.$scope.editingVendorProfile = true;
            return;
        }

        this.$scope.editingVendorProfile = false;
    };

    protected _shouldCitiesSelectionDisabled = (): boolean => {
        const availableStates = this.$scope.availableStates;
        const availableCities = this.$scope.availableCities;

        if (!availableStates || !availableCities || !availableCities.length) {
            return true;
        }

        const editVendorModel = this.$scope.editVendorModel;
        if (!editVendorModel) {
            return true;
        }

        if (!editVendorModel.address.value || !editVendorModel.address.value.stateId) {
            return true;
        }

        // Cities are being loaded.
        if (this.$scope.loadingAvailableCities) {
            return true;
        }

        return false;
    };

    protected _clickReloadCities = (stateId: string): void => {

        if (!stateId) {
            return;
        }

        // Mark the cities are being loaded.
        this.$scope.loadingAvailableCities = false;

        const loadCitiesConditions = new LoadCitiesViewModel();
        loadCitiesConditions.stateIds = [stateId];
        loadCitiesConditions.pager = new PagerViewModel();
        loadCitiesConditions.pager.page = 1;
        loadCitiesConditions.pager.records = ValidationValueConstant.maxSupportedSearchRecords;

        this.$cities
            .loadCitiesAsync(loadCitiesConditions)
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.availableCities = loadCitiesResult.items;
            })
            .finally(() => {
                this.$scope.loadingAvailableCities = false;
            });

    };

    protected _clickCancelEditFoodVendor = (): void => {
        this.$scope.editingVendorProfile = false;
    };

    protected _clickUpdateFoodDeliveryVendor = (event: Event): void => {

        if (event) {
            event.preventDefault();
        }

        const editFoodVendorDetailForm = this.$scope.editFoodVendorDetailForm;

        if (editFoodVendorDetailForm.$invalid || !editFoodVendorDetailForm.$dirty) {
            return;
        }

        // Display loading screen.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        const model: EditFoodDeliveryVendorModel = {...this.$scope.editVendorModel};
        const validKeys = ['name', 'icNo', 'phoneNo', 'vehicle', 'address'];

        for (const validKey of validKeys) {
            if (!validKey || !model[validKey]) {
                continue;
            }

            // Mark the field to be modified.
            (<EditableFieldViewModel<any>>model[validKey]).hasModified = true;
        }


        this.$users.editFoodDeliveryVendorAsync(this.$scope.detailedUser.id,
            model)
            .then((foodDeliveryVendor: IFoodDeliveryVendor) => {
                // Turn off edit mode.
                this.$scope.editingVendorProfile = false;

                // Update the food vendor model.
                this.$scope.detailedUser.vendor = foodDeliveryVendor;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    //#endregion

}
