import {IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {CloudDeviceViewModel} from "../../view-models/cloud-device/cloud-device.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";
import {DetailedAppointmentViewModel} from "../../view-models/appointment/detailed-appointment.view-model";
import {LoadAppointmentViewModel} from "../../view-models/appointment/load-appointment.view-model";

export interface IAppointmentManagementScope extends IScope {

    //#region Properties

    loadAppointmentsResult: SearchResultViewModel<DetailedAppointmentViewModel>;

    loadAppointmentsCondition: LoadAppointmentViewModel;

    loadingAppointments: boolean;

    //#endregion

    //#region Methods

    shouldAppointmentsDisplayed(): boolean;

    clickDeleteCloudDevice(cloudDevice: CloudDeviceViewModel): void;

    clickReloadAppointments(page?: number): void;

    clickSetupAppointment(): void;

    //#endregion

}
