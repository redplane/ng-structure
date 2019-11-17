import {LoadStatesViewModel} from "../../view-models/state/load-states.view-model";
import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {StateViewModel} from "../../view-models/state/state-view.model";
import {AddStateViewModel} from "../../view-models/state/add-state.view-model";
import {EditStateViewModel} from "../../view-models/state/edit-state.view-model";

export interface IStatesService {

    //#region Methods

    /*
    * Load states asynchronously.
    * */
    loadStatesAsync(condition: LoadStatesViewModel): IPromise<SearchResultViewModel<StateViewModel>>;

    /*
    * Load whole states asynchronously.
    * */
    loadWholeStatesAsync(): IPromise<StateViewModel[]>;

    /*
    * Add state into system asynchronously.
    * */
    addStateAsync(model: AddStateViewModel): IPromise<StateViewModel>;

    /*
    * Delete state by id.
    * */
    deleteStateAsync(stateId: string): IPromise<void>;

    /*
    * Edit state by id.
    * */
    editStateAsync(stateId: string, model: EditStateViewModel): IPromise<StateViewModel>;

    // Load states by ids asynchronously.
    loadStatesByIdsAsync(ids: string[]): IPromise<{[key: string]: StateViewModel}>;

    //#endregion
}
