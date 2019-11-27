import {IFormController, INgModelOptions, IPromise, IScope} from "angular";
import {UserViewModel} from "../../../view-models/user/user.view-model";

export interface IAppointmentSetupScope extends IScope, ng.ui.bootstrap.IModalScope {

    //#region Properties

    users: UserViewModel[]

    selectedUser: UserViewModel;

    selectedAppointmentTime: Date;

    ngModelOptions: INgModelOptions;

    datePickerOptions: angular.ui.bootstrap.IDatepickerConfig;

    //#endregion

    //#region Methods

    clickDismissModal(): void;

    clickSetupAppointment(): void;

    loadAvailableFoodVendorsAsync(username: string): IPromise<UserViewModel[]>;

    //#endregion
}
