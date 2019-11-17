import {IVendor} from "./vendor.interface";
import {IRegion} from "./region.interface";

export interface IFoodVendor extends IVendor{

    //#region Properties

    // Locations assigned to food vendor.
    assignedLocations: IRegion[];

    //#endregion

}
