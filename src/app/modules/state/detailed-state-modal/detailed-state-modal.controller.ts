import {IController} from "angular";
import {IDetailedStateModalScope} from "./detailed-state-modal.scope";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {AddStateViewModel} from "../../../view-models/states/add-state.view-model";
import {StateDetailFormViewModel} from "../../../view-models/states/state-detail-form.view-model";
import {EditStateViewModel} from "../../../view-models/states/edit-state.view-model";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {KeyValueModel} from "../../../models/key-value.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";

/* @ngInject */
export class DetailedStateModalController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IDetailedStateModalScope,
                       protected detailedState: StateViewModel) {

        this.$scope.detailedState = new StateViewModel(null);
        if (detailedState) {
            this.$scope.detailedState = {...detailedState};
            this.$scope.initialDetailedState = <StateViewModel> {
                ...detailedState
            };

            this.$scope.editorMode = EditorModes.edit;
        } else {
            this.$scope.editorMode = EditorModes.add;
        }

        this.$scope.availabilities = [
            new KeyValueModel('TITLE_UNAVAILABLE', MasterItemAvailabilities.unavailable),
            new KeyValueModel('TITLE_AVAILABLE', MasterItemAvailabilities.available)
        ];

        this.$scope.editorModes = EditorModes;
        this.$scope.clickCancel = this._clickCancel;
        this.$scope.clickOk = this._clickOk;
    }

    //#endregion

    //#region Methods

    /*
    * Called when cancel is clicked.
    * */
    private _clickCancel = (): void => {
        this.$scope.$dismiss();
    };

    /*
    * Called when ok is clicked.
    * */
    private _clickOk = (stateForm: StateDetailFormViewModel): void => {

        const model = this.$scope.detailedState;

        switch (this.$scope.editorMode) {
            case EditorModes.edit:
                const editStateModel = new EditStateViewModel(model.id);

                // State name.
                editStateModel.name = new EditableFieldViewModel<string>();
                editStateModel.name.value = model.name;
                editStateModel.name.hasModified = stateForm.name.$dirty;

                // State delivery fee.
                editStateModel.deliveryFee = new EditableFieldViewModel<number>();
                editStateModel.deliveryFee.value = model.deliveryFee;
                editStateModel.deliveryFee.hasModified = stateForm.deliveryFee.$dirty;

                // Availability.
                editStateModel.availability = new EditableFieldViewModel<number>();
                editStateModel.availability.value = model.availability;
                editStateModel.availability.hasModified = stateForm.availability.$dirty;

                this.$scope.$close(editStateModel);
                return;

            default:
                const addStateModel: AddStateViewModel = {
                    ...model
                };

                this.$scope.$close(addStateModel);
                return;

        }
    };
    //#endregion
}
