import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {CityViewModel} from "../../view-models/city/city.view-model";
import {LoadCitiesViewModel} from "../../view-models/city/load-cities.view-model";
import {IScope} from "angular";
import {StateViewModel} from "../../view-models/states/state-view.model";

export interface ICityManagementScope extends IScope {

    //#region Properties

    /*
    * Id to states mapping.
    * */
    idToState: { [id: string]: StateViewModel };

    /*
    * Loaded states.
    * */
    states: StateViewModel[];

    /*
    * Result of loading cities.
    * */
    loadCitiesResult: SearchResultViewModel<CityViewModel>;

    /*
    * Whether cities are being loaded or not.
    * */
    loadCities: boolean;

    /*
    * Condition to load city items.
    * */
    loadCitiesConditions: LoadCitiesViewModel;

    /*
    * Enum reflection
    * */
    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    /*
    * Should cities list be displayed or not.
    * */
    shouldCitiesDisplayed: () => boolean;

    /*
    * Should the controls be available or not.
    * */
    shouldControlsAvailable: () => boolean;

    /*
    * Add city.
    * */
    clickAddCity: () => void;

    /*
    * Delete city
    * */
    clickDeleteCity: (cityId: string) => void;

    /*
    * Raised when edit city is clicked.
    * */
    clickEditCity: (city: CityViewModel) => void;

    /*
    * Click open finder modal.
    * */
    clickOpenCitiesFinderModal: () => void;

    /*
    * Click reload cities.
    * */
    clickReloadCities: (page: number) => void;

    //#endregion
}
