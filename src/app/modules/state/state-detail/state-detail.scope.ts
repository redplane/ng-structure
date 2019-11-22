import {StateViewModel} from "../../../view-models/states/state-view.model";
import {IStateDetailResolver} from "../../../interfaces/resolvers/state-detail.resolver";
import {StateDetailFormViewModel} from "../../../view-models/states/state-detail-form.view-model";

export interface IStateDetailScope extends ng.ui.bootstrap.IModalScope{

    //#region Properties

    $resolve: IStateDetailResolver;

    inEditMode: boolean;

    /*
    * Model for adding faq.
    * */
    stateModel: StateViewModel;

    /*
    * Original states model.
    * */
    originalStateModel: StateViewModel;

    readonly addEditStateForm: StateDetailFormViewModel;

    //#endregion

    //#region Methods

    /*
    * Called when cancel is clicked.
    * */
    clickCancel(): void;

    /*
    * Called when ok is clicked.
    * */
    clickOk(form): void;

    //#endregion
}
