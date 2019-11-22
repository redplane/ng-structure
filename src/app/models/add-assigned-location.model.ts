import {StateViewModel} from "../view-models/states/state-view.model";
import {CityViewModel} from "../view-models/city/city.view-model";

export class AddAssignedLocationModel {

    //#region Properties

    public stateId: string | null;

    public cityId: string | null;

    public selectedState: StateViewModel;

    public selectedCity: CityViewModel;

    //#endregion

}
