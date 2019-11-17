import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {AddressViewModel} from "../../../../../view-models/address.view-model";
import {ICoordinate} from "../../../../../interfaces/coordinate.interface";
import {IScope} from "angular";

export interface IDetailedFoodVendorScope extends IScope{

    //#region Properties

    detailedUser: DetailedUserViewModel;

    //#endregion

    //#region Methods

    loadAddressDisplay(address: AddressViewModel): string;

    loadAddressCoordinate(coordinate: ICoordinate): string;

    loadGMapUrl(): string;

    shouldBankDisplayed(): boolean;

    //#endregion
}
