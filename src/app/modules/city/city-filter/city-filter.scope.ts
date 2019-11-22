import {IScope} from "angular";
import {ICityDetailResolver} from "../../../interfaces/resolvers/city-detail.resolver";
import {StateViewModel} from "../../../view-models/states/state-view.model";

export interface ICityFilterScope extends IScope, ng.ui.bootstrap.IModalScope {

    //#region Properties

    /*
    * View value resolver.
    * */
    $resolve: ICityDetailResolver;

    /*
    * Available states in system.
    * */
    availableStates: StateViewModel[];

    /*
    * Id of states.
    * */
    stateId: string;

    //#endregion

    //#region Methods

    /*
    * Close modal dialog.
    * */
    closeModal: () => void;

    //#endregion

}
