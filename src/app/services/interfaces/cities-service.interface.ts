import {LoadCitiesViewModel} from "../../view-models/city/load-cities.view-model";
import {CityViewModel} from "../../view-models/city/city.view-model";
import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {AddCityViewModel} from "../../view-models/city/add-city.view-model";
import {EditCityViewModel} from "../../view-models/city/edit-city.view-model";

export interface ICitiesService {

    //#region Methods

    /*
    * Load states asynchronously.
    * */
    loadCitiesAsync(condition: LoadCitiesViewModel): IPromise<SearchResultViewModel<CityViewModel>>;

    /*
    * Add states into system asynchronously.
    * */
    addCityAsync(model: AddCityViewModel): IPromise<CityViewModel>;

    /*
    * Delete states by id.
    * */
    deleteCityAsync(cityId: string): IPromise<void>;

    /*
    * Edit states by id.
    * */
    editCityAsync(stateId: string, model: EditCityViewModel): IPromise<CityViewModel>;

    // Load cities by using ids.
    loadCitiesByIdsAsync(ids: string[]): IPromise<{[key: string]: CityViewModel}>;

    //#endregion

}
