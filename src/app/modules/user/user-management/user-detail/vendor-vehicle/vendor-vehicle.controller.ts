import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUsersService} from "../../../../../services/interfaces/user-service.interface";
import {IVendorVehicleScope} from "./vendor-vehicle.scope";
import {IVehicle} from "../../../../../interfaces/vehicle.interface";
import {KeyValueModel} from "../../../../../models/key-value.model";
import {VehicleTypes} from "../../../../../enums/vehicle-types.enum";

/* @ngInject */
export class VendorVehicleController implements IController {

    //#region Constructor

    public constructor(protected detailedUser: DetailedUserViewModel,
                       protected $users: IUsersService,
                       protected $scope: IVendorVehicleScope) {

        $scope.loadVehicleName = this._loadVehicleName;

    }

    //#endregion

    //#region Methods

    protected _loadVehicleName = (vehicle: IVehicle): string => {
        const validVehicles = [];
        validVehicles.push({key: VehicleTypes.other, value: vehicle.name});
        validVehicles.push({key: VehicleTypes.motorcycle, value: 'TITLE_MOTORCYCLE'});
        validVehicles.push({key: VehicleTypes.van, value: 'TITLE_VAN'});
    };

    //#endregion

}