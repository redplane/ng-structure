import {IScope} from "angular";
import {IVehicle} from "../../../../../interfaces/vehicle.interface";

export interface IVendorVehicleScope extends IScope {

    //#region Properties

    //#endregion

    //#region Methods

    loadVehicleName(vehicle: IVehicle): string;

    //#endregion
}