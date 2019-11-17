import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUsersService} from "../../../../../services/interfaces/user-service.interface";
import {IDetailedFoodVendorScope} from "./detailed-food-vendor.scope";
import {AddressViewModel} from "../../../../../view-models/address.view-model";
import {IAppSettings} from "../../../../../interfaces/app-setting.interface";
import {ICoordinate} from "../../../../../interfaces/coordinate.interface";
import {UserRoles} from "../../../../../enums/user-roles.enum";

/* @ngInject */
export class DetailedFoodVendorController implements IController {

    //#regon Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected appSettings: IAppSettings,
                       protected $users: IUsersService,
                       protected $scope: IDetailedFoodVendorScope) {

        $scope.detailedUser = detailedUser;
        $scope.loadAddressDisplay = this._loadAddressDisplay;
        $scope.loadGMapUrl = () => appSettings.gMapUrl;
        $scope.loadAddressCoordinate = (coordinate: ICoordinate) => `${coordinate.latitude}, ${coordinate.longitude}`;
        $scope.shouldBankDisplayed = this._shouldBankDisplayed;
    }

    //#endregion

    //#region Methods

    protected _loadAddressDisplay = (address: AddressViewModel): string => {
        const items = [address.auxiliaryAddress, address.addressText, address.postalCode, address.cityName, address.stateName];
        return items
            .filter(item => item && item.length)
            .join(",");
    };

    protected _shouldBankDisplayed = (): boolean => {
        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodVendor]);
    };

    //#endregion

}
