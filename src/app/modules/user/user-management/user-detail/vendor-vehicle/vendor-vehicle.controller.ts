import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUsersService} from "../../../../../services/interfaces/user-service.interface";
import {IVendorVehicleScope} from "./vendor-vehicle.scope";
import {IVehicle} from "../../../../../interfaces/vehicle.interface";
import {VehicleTypes} from "../../../../../enums/vehicle-types.enum";
import {IFoodDeliveryVendor} from "../../../../../interfaces/food-delivery-vendor.interface";
import {EditFoodDeliveryVendorModel} from "../../../../../models/edit-food-delivery-vendor.model";
import {EditableFieldViewModel} from "../../../../../view-models/editable-field.view-model";
import {INgRxMessageBusService} from "../../../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../../../constants/message-event-name.constant";

/* @ngInject */
export class VendorVehicleController implements IController {

    //#region Constructor

    public constructor(protected detailedUser: DetailedUserViewModel,
                       protected $users: IUsersService,
                       protected $scope: IVendorVehicleScope,
                       protected $messageBus: INgRxMessageBusService) {
        $scope.vehicleTypeConstants = VehicleTypes;
        $scope.detailedUser = detailedUser;

        const validVehicles = [];
        validVehicles.push({key: VehicleTypes.other, value: 'TITLE_OTHER'});
        validVehicles.push({key: VehicleTypes.motorcycle, value: 'TITLE_MOTORCYCLE'});
        validVehicles.push({key: VehicleTypes.van, value: 'TITLE_VAN'});
        validVehicles.push({key: VehicleTypes.car, value: 'TITLE_CAR'});
        validVehicles.push({key: VehicleTypes.lorry, value: 'TITLE_LORRY'});
        this.$scope.validVehicles = validVehicles;

        $scope.loadVehicleName = this._loadVehicleName;
        $scope.shouldVehicleTypeDisplayed = this._shouldVehicleTypeDisplayed;
        $scope.clickEditVendorVehicle = this._clickEditVendorVehicle;
        $scope.clickCancelEditVendorVehicle = this._clickCancelEditVendorVehicle;
        $scope.shouldVehicleNameDisplay = this._shouldVehicleNameDisplay;
        $scope.clickUpdateVendorVehicle = this._clickUpdateVendorVehicle;
    }

    //#endregion

    //#region Methods

    protected _loadVehicleName = (vehicle: IVehicle): string => {

        const itemIndex = this.$scope
            .validVehicles
            .findIndex(validVehicle => validVehicle.key == vehicle.type);

        if (itemIndex < 0) {
            return vehicle.name;
        }

        return this.$scope
            .validVehicles[itemIndex].value;
    };

    protected _shouldVehicleTypeDisplayed = (): boolean => {
        const vendor = <IFoodDeliveryVendor> this.detailedUser.vendor;
        if (!vendor) {
            return false;
        }

        const vehicle = <IVehicle> vendor.vehicle;
        if (!vehicle) {
            return false;
        }

        // In edit mode.
        if (!this.$scope.editingVendorVehicle) {
            return false;
        }

        return true;
    };

    protected _clickEditVendorVehicle = (): void => {

        const vendor = <IFoodDeliveryVendor> this.$scope.detailedUser.vendor;
        if (!vendor) {
            return;
        }

        const editVendorModel = new EditFoodDeliveryVendorModel();
        editVendorModel.vehicle = new EditableFieldViewModel<IVehicle>(vendor.vehicle, true);
        this.$scope.editVendorModel = editVendorModel;
        this.$scope.editingVendorVehicle = true;
    };

    protected _clickCancelEditVendorVehicle = (): void => {
        this.$scope.editingVendorVehicle = false;
    };

    protected _shouldVehicleNameDisplay = (): boolean => {

        // In view mode.
        if (!this.$scope.editingVendorVehicle) {
            return true;
        }

        const vendor = <IFoodDeliveryVendor> this.$scope.detailedUser.vendor;
        if (!vendor || !vendor.vehicle) {
            return;
        }

        const vehicle = vendor.vehicle;
        return vehicle.type == VehicleTypes.other;
    };

    protected _clickUpdateVendorVehicle = (event: Event): void => {
        if (event) {
            event.preventDefault();
        }

        if (!this.$scope.editVendorVehicleForm || !this.$scope.editVendorVehicleForm.$valid || !this.$scope.editVendorVehicleForm.$dirty) {
            return;
        }

        const editVendorModel = new EditFoodDeliveryVendorModel();
        editVendorModel.vehicle = this.$scope.editVendorModel.vehicle;
        editVendorModel.vehicle.hasModified = true;

        // Display loading screen.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$users
            .editFoodDeliveryVendorAsync(this.$scope.detailedUser.id, editVendorModel)
            .then((vendor: IFoodDeliveryVendor) => {
                (<IFoodDeliveryVendor> this.$scope.detailedUser.vendor).vehicle = vendor.vehicle;
                this.$scope.editingVendorVehicle = false;
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };


    //#endregion

}