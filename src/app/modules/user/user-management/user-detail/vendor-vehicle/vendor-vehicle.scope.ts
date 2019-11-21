import {IFormController, IScope} from "angular";
import {IVehicle} from "../../../../../interfaces/vehicle.interface";
import {VehicleTypes} from "../../../../../enums/vehicle-types.enum";
import {EditFoodDeliveryVendorModel} from "../../../../../models/edit-food-delivery-vendor.model";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";

export interface IVendorVehicleScope extends IScope {

    //#region Properties

    editVendorVehicleForm: IFormController;

    vehicleTypeConstants: typeof VehicleTypes;

    editingVendorVehicle: boolean;

    editVendorModel: EditFoodDeliveryVendorModel;

    detailedUser: DetailedUserViewModel;

    validVehicles: any[];

    //#endregion

    //#region Methods

    loadVehicleName(vehicle: IVehicle): string;

    shouldVehicleTypeDisplayed(): boolean;

    shouldVehicleNameDisplay(): boolean;

    clickEditVendorVehicle(): void;

    clickCancelEditVendorVehicle(): void;

    clickUpdateVendorVehicle(event: Event): void;

    //#endregion
}