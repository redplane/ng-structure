import {CityViewModel} from "../../view-models/city/city.view-model";
import {IPromise} from "angular";

export interface ICityDetailResolver {

    //#region Properties

    city: CityViewModel | IPromise<CityViewModel>;

    //#endregion
}
