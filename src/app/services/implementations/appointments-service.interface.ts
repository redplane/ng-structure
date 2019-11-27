import {LoadAppointmentViewModel} from "../../view-models/appointment/load-appointment.view-model";
import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {AppointmentViewModel} from "../../view-models/appointment/appointment.view-model";
import {DetailedAppointmentViewModel} from "../../view-models/appointment/detailed-appointment.view-model";
import {SetupAppointmentViewModel} from "../../view-models/appointment/setup-appointment.view-model";

export interface IAppointmentsService {

    loadAppointmentsAsync(conditions: LoadAppointmentViewModel): IPromise<SearchResultViewModel<AppointmentViewModel>>;

    loadDetailedAppointmentsAsync(conditions: LoadAppointmentViewModel): IPromise<SearchResultViewModel<DetailedAppointmentViewModel>>;

    setupAppointmentAsync(model: SetupAppointmentViewModel): IPromise<AppointmentViewModel>;
}
