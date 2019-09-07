import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {LoadStatesViewModel} from "../../../view-models/state/load-states.view-model";
import {StateViewModel} from "../../../view-models/state/state-view.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

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
    * Condition to load state items.
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
    * Add state.
    * */
    clickAddState: () => void;

    /*
    * Delete state
    * */
    clickDeleteState: (stateId: string) => void;

    /*
    * Raised when edit state is clicked.
    * */
    clickEditState: (state: StateViewModel) => void;

    /*
    * Click reload cities.
    * */
    clickReloadStates: (page: number) => void;

    //#endregion
}
