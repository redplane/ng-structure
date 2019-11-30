import {IPromise} from "angular";
import {AddAssignedLocationModel} from "../../models/add-assigned-location.model";

export interface ILocationPickerModalsService {

    displayLocationPickerModalAsync(): IPromise<AddAssignedLocationModel>;

}
