import {StateViewModel} from "../../view-models/states/state-view.model";
import {IPromise} from "angular";

export interface IStateDetailResolver {

    //#region Properties

    /*
    * State details
    * */
    state: StateViewModel | IPromise<StateViewModel>;

    //#endregion
}
