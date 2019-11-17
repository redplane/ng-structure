import {UserViewModel} from "./user.view-model";
import {IVendor} from "../../interfaces/vendor.interface";
import {IFoodVendor} from "../../interfaces/food-vendor.interface";

export class DetailedUserViewModel extends UserViewModel {

    //#region Properties

    // Vendor information.
    public vendor: IVendor | IFoodVendor;

    //#endregion

}
