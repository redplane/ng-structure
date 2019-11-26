import {AppointmentViewModel} from "./appointment.view-model";
import {UserViewModel} from "../user/user.view-model";

export class DetailedAppointmentViewModel extends AppointmentViewModel {

    public vendor: UserViewModel;

    public admin: UserViewModel;

}