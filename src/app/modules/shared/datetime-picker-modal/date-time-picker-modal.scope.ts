import {IScope} from "angular";
import {IModalScope} from "angular-ui-bootstrap";

export interface IDateTimePickerModalScope extends IScope, IModalScope {

    //#region Properties

    selectedDate: Date | null;

    selectedHour: number;

    selectedMinute: number;

    availableHours: number[];

    availableMinutes: number[];

    //#endregion

    //#region Methods

    clickDismissModal(): void;

    clickSelectDateTime(): void;

    //#endregion

}
