import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {AddressViewModel} from "../../../../../view-models/address.view-model";

export interface IDetailedVendorScope {

    //#region Properties

    detailedUser: DetailedUserViewModel;

    //#endregion

    //#region Methods

    loadAddressDisplay(address: AddressViewModel): string;

    //#endregion
}
