import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUserService} from "../../../../../services/interfaces/user-service.interface";
import {IDetailedVendorScope} from "./detailed-vendor.scope";
import {AddressViewModel} from "../../../../../view-models/address.view-model";

/* @ngInject */
export class DetailedVendorController implements IController {

    //#regon Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected $users: IUserService,
                       protected $scope: IDetailedVendorScope) {

        $scope.detailedUser = detailedUser;
        $scope.loadAddressDisplay = this._loadAddressDisplay;
    }

    //#endregion

    //#region Methods

    protected _loadAddressDisplay = (address: AddressViewModel): string => {
        const items = [address.auxiliaryAddress, address.addressText, address.postalCode, address.cityName, address.stateName];
        return items
            .filter(item => item && item.length)
            .join(",");

    };

    //#endregion

}
