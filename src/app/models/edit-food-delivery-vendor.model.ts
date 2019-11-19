import {EditableFieldViewModel} from "../view-models/editable-field.view-model";
import {IAddress} from "../interfaces/address.interface";
import {IRegion} from "../interfaces/region.interface";
import {IVehicle} from "../interfaces/vehicle.interface";
import {VehicleTypes} from "../enums/vehicle-types.enum";

export class EditFoodDeliveryVendorModel {

    //#region Properties

    public name: EditableFieldViewModel<string>;

    public icNo: EditableFieldViewModel<string>;

    public phoneNo: EditableFieldViewModel<string>;

    public vehicle: EditableFieldViewModel<IVehicle>;

    public address: EditableFieldViewModel<IAddress>;

    public preferredLocations: EditableFieldViewModel<IRegion[]>;

    public photo: Blob | null;

    //#endregion

    //#region Constructor

    public constructor() {
        this.name = new EditableFieldViewModel<string>('', false);
        this.icNo = new EditableFieldViewModel<string>('', false);
        this.phoneNo = new EditableFieldViewModel<string>('', false);

        const vehicle: IVehicle = {
            model: '',
            name: '',
            plateNo: '',
            type: VehicleTypes.other
        };

        const address: IAddress = {
            auxiliaryAddress: '',
            addressText: '',
            cityId: '',
            stateId: '',
            coordinate: null,
            postalCode: ''
        };

        this.vehicle = new EditableFieldViewModel<IVehicle>(vehicle, false);
        this.address = new EditableFieldViewModel<IAddress>(address, false);
        this.preferredLocations = new EditableFieldViewModel<IRegion[]>([], false);
    }

    //#endregion

}