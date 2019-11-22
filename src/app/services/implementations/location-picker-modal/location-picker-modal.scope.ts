import {IScope} from "angular";
import {IModalScope} from "angular-ui-bootstrap";
import {AddAssignedLocationModel} from "../../../models/add-assigned-location.model";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {CityViewModel} from "../../../view-models/city/city.view-model";

export interface ILocationPickerScope extends IScope, IModalScope {

    //#region Properties

    // Available states in the system.
    availableStates: StateViewModel[];

    // Available cities in the system.
    availableCities: CityViewModel[];

    selectedStateId: string | null;

    selectedCityId: string | null;

    //#endregion

    //#region Methods

    shouldStatesSelectionDisabled(): boolean;

    shouldCitiesSelectionDisabled(): boolean;

    clickOk(): void;

    clickCancel(): void;

    //#endregion
}
