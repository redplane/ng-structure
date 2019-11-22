import {CityViewModel} from "../../view-models/city/city.view-model";
import {StateViewModel} from "../../view-models/states/state-view.model";

export interface ICityDetailResolver {

    //#region Properties

    city: CityViewModel;

    states: StateViewModel[];

    //#endregion
}
