import {StateViewModel} from "../../../view-models/states/state-view.model";
import {IStateDetailResolver} from "../../../interfaces/resolvers/state-detail.resolver";
import {StateDetailFormViewModel} from "../../../view-models/states/state-detail-form.view-model";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {KeyValueModel} from "../../../models/key-value.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

export interface IDetailedStateModalScope extends ng.ui.bootstrap.IModalScope {

    //#region Properties

    $resolve: IStateDetailResolver;

    editorModes: typeof EditorModes;

    editorMode: EditorModes;

    /*
    * Model for adding faq.
    * */
    detailedState: StateViewModel;

    /*
    * Original states model.
    * */
    initialDetailedState: StateViewModel;

    readonly addEditStateForm: StateDetailFormViewModel;

    availabilities: KeyValueModel<MasterItemAvailabilities>[];

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
