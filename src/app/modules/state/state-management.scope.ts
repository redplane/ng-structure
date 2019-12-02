import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {LoadStatesViewModel} from "../../view-models/states/load-states.view-model";
import {StateViewModel} from "../../view-models/states/state-view.model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export interface IStateMasterPageScope {

    //#region Properties

    /*
    * Result of loading states.
    * */
    loadStatesResult: SearchResultViewModel<StateViewModel>;

    /*
    * Whether states are being loaded or not.
    * */
    loadStates: boolean;

    /*
    * Condition to load states items.
    * */
    loadStatesConditions: LoadStatesViewModel;

    /*
    * Enum reflection
    * */
    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    /*
    * Should states list be displayed or not.
    * */
    shouldStatesDisplayed: () => boolean;

    /*
    * Should the controls be available or not.
    * */
    shouldControlsAvailable: () => boolean;

    /*
    * Add states.
    * */
    clickAddState: () => void;

    /*
    * Delete states
    * */
    clickDeleteState: (stateId: string) => void;

    /*
    * Raised when edit states is clicked.
    * */
    clickEditState: (state: StateViewModel) => void;

    /*
    * Click reload cities.
    * */
    clickReloadStates: (page: number) => void;

    //#endregion
}
