import {IFormController, IScope} from "angular";
import {KeyValueModel} from "../../../models/key-value.model";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {PhraseViewModel} from "../../../view-models/phrase/phrase.view-model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

export interface IDetailedPhraseScope extends IScope, ng.ui.bootstrap.IModalScope {

    //#region Properties

    // Name of sticker.
    text: EditableFieldViewModel<string>;

    availability: EditableFieldViewModel<MasterItemAvailabilities>;

    initialModel: PhraseViewModel;

    detailedPhraseForm: IFormController;

    availableAvailabilities: KeyValueModel<MasterItemAvailabilities>[];

    //#endregion

    //#region Methods

    loadModalTitle(): string;

    clickDismissModal(): void;

    clickAddEditPhrase(): void;

    shouldAvailabilitySelectionDisplayed(): boolean;

    //#endregion
}
