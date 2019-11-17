import {EditableFieldViewModel} from "../editable-field.view-model";
import {IRegion} from "../../interfaces/region.interface";
import {IBank} from "../../interfaces/bank.interface";
import {IAddress} from "../../interfaces/address.interface";

export class EditFoodVendorViewModel {

    //#region Properties

    public userId: string;

    public assignedLocations: EditableFieldViewModel<IRegion[]>;

    public vendorName: EditableFieldViewModel<string>;

    public phoneNo: EditableFieldViewModel<string>;

    public bank: EditableFieldViewModel<IBank>;

    public address: EditableFieldViewModel<IAddress>;

    //#endregion

}
