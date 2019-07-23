import {IController} from "angular";
import {IStateDetailScope} from "./state-detail.scope";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {StateViewModel} from "../../../view-models/state/state-view.model";
import {AddStateViewModel} from "../../../view-models/state/add-state.view-model";
import {StateDetailFormViewModel} from "../../../view-models/state/state-detail-form.view-model";
import {EditStateViewModel} from "../../../view-models/state/edit-state.view-model";

/* @ngInject */
export class StateDetailController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IStateDetailScope) {

        this.$scope.stateModel = new StateViewModel(null);

        const state = this.$scope.$resolve.state;
        if (state) {
            this.$scope.inEditMode = true;
            this.$scope.stateModel = <StateViewModel> state;
            this.$scope.originalStateModel = <StateViewModel> {
                ...state
            }
        }

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

        const model = this.$scope.stateModel;

        if (!this.$scope.inEditMode) {
            const addStateModel: AddStateViewModel = {
                ...model
            };

            this.$scope.$close(addStateModel);
        }

        const editStateModel = new EditStateViewModel(model.id);

        // State name.
        editStateModel.name = new EditableFieldViewModel<string>();
        editStateModel.name.value = model.name;
        editStateModel.name.hasModified = stateForm.name.$dirty;

        // State delivery fee.
        editStateModel.deliveryFee = new EditableFieldViewModel<number>();
        editStateModel.deliveryFee.value = model.deliveryFee;
        editStateModel.deliveryFee.hasModified = stateForm.deliveryFee.$dirty;

        this.$scope.$close(editStateModel);
    };
    //#endregion
}
