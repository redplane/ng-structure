import {IVendor} from "./vendor.interface";
import {IVehicle} from "./vehicle.interface";
import {IRegion} from "./region.interface";

export interface IFoodDeliveryVendor extends IVendor {

    //#region Properties

    icNo: string;

    vehicle: IVehicle;

    preferredLocations: IRegion[];

    //#endregion

}