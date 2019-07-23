import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {LoadStatesViewModel} from "../../../view-models/state/load-states.view-model";
import {StateViewModel} from "../../../view-models/state/state-view.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

export interface IStateMasterPageScope {

    //#region Properties

    /*
    * Result of loading faqs.
    * */
    loadStatesResult: SearchResultViewModel<StateViewModel>;

    /*
    * Whether faqs are being loaded or not.
    * */
    loadStates: boolean;

    /*
    * Condition to load faq items.
    * */
    loadStatesConditions: LoadStatesViewModel;

    /*
    * Enum reflection
    * */
    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    /*
    * Should faqs list be displayed or not.
    * */
    shouldStatesDisplayed: () => boolean;

    /*
    * Should the controls be available or not.
    * */
    shouldControlsAvailable: () => boolean;

    /*
    * Called when faq master page is loaded.
    * */
    ngOnStateMasterPageLoaded: () => void;

    /*
    * Add faq.
    * */
    clickAddState: () => void;

    /*
    * Delete faq
    * */
    clickDeleteState: (stateId: string) => void;

    /*
    * Raised when edit faq is clicked.
    * */
    clickEditState: (state: StateViewModel) => void;

    //#endregion
}
