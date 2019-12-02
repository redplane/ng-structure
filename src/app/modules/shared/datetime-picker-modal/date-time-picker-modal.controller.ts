import {IController} from "angular";
import {IDateTimePickerModalScope} from "./date-time-picker-modal.scope";

export class DateTimePickerModalController implements IController {

    public constructor(protected $scope: IDateTimePickerModalScope) {

        const hours: number[] = [];
        const minutes: number[] = [];

        for (let hour = 1; hour <= 12; hour++) {
            hours.push(hour);
        }

        minutes.push(0);
        minutes.push(15);
        minutes.push(30);
        minutes.push(45);

        $scope.availableHours = hours;
        $scope.availableMinutes = minutes;

        $scope.clickDismissModal = this._clickDismissModal;
        $scope.clickSelectDateTime = this._clickSelectDateTime;
    }

    public _clickDismissModal = (): void => {
        this.$scope.$dismiss();
    };

    protected _clickSelectDateTime = (): void => {
        const selectedDate = this.$scope.selectedDate;
        const selectedHour = this.$scope.selectedHour;
        const selectedMinute = this.$scope.selectedMinute;

        const date = new Date();
        date.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        date.setHours(selectedHour, selectedMinute);

        this.$scope.$close(date.getTime());
    }
}
