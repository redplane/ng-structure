import {UserViewModel} from "./user.view-model";
import {IVendor} from "../../interfaces/vendor.interface";
import {IFoodVendor} from "../../interfaces/food-vendor.interface";
import {IFoodDeliveryVendor} from "../../interfaces/food-delivery-vendor.interface";

export class DetailedUserViewModel extends UserViewModel {

    //#region Properties

    // Vendor information.
    public vendor: IVendor | IFoodVendor | IFoodDeliveryVendor;

    //#endregion

}
