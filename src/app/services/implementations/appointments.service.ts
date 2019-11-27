import {UsersService} from "./users.service";
import {IHttpParamSerializer, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {LoadAppointmentViewModel} from "../../view-models/appointment/load-appointment.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {AppointmentViewModel} from "../../view-models/appointment/appointment.view-model";
import {DetailedAppointmentViewModel} from "../../view-models/appointment/detailed-appointment.view-model";
import {PagerResultViewModel} from "../../view-models/pager-result.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";
import {LoadUserViewModel} from "../../view-models/user/load-user.view-model";
import {PagerViewModel} from "../../view-models/pager.view-model";
import {IAppointmentsService} from "./appointments-service.interface";
import {SetupAppointmentViewModel} from "../../view-models/appointment/setup-appointment.view-model";

export class AppointmentsService extends UsersService implements IAppointmentsService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings,
                       protected $httpParamSerializer: IHttpParamSerializer) {
        super($http, appSettings, $httpParamSerializer);
    }

    //#endregion

    //#region Methods

    public loadAppointmentsAsync(conditions: LoadAppointmentViewModel): IPromise<SearchResultViewModel<AppointmentViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/appointment/search`;
        return this.$http
            .post<SearchResultViewModel<AppointmentViewModel>>(fullUrl, conditions)
            .then(m => m.data);
    };

    public loadDetailedAppointmentsAsync(conditions: LoadAppointmentViewModel): IPromise<SearchResultViewModel<DetailedAppointmentViewModel>> {
        return this.loadAppointmentsAsync(conditions)
            .then((loadAppointmentsResult: SearchResultViewModel<AppointmentViewModel>) => {
                if (!loadAppointmentsResult || !loadAppointmentsResult.items) {
                    return new SearchResultViewModel<DetailedAppointmentViewModel>([], new PagerResultViewModel());
                }

                const idToUser: { [id: string]: UserViewModel } = {};
                const appointments = loadAppointmentsResult.items;
                const userIds: string[] = [];
                for (const appointment of appointments) {

                    if (appointment.adminId) {
                        userIds.push(appointment.adminId);
                    }

                    if (appointment.foodVendorId) {
                        userIds.push(appointment.foodVendorId);
                    }
                }

                const loadUsersCondition = new LoadUserViewModel();
                loadUsersCondition.ids = userIds;
                loadUsersCondition.pager = new PagerViewModel(1, userIds.length);

                return this
                    .loadUsersAsync(loadUsersCondition)
                    .then((loadUsersResult: SearchResultViewModel<UserViewModel>) => {
                        if (!loadUsersResult || !loadUsersResult.items) {
                            return new SearchResultViewModel<DetailedAppointmentViewModel>([], new PagerResultViewModel());
                        }

                        for (const user of loadUsersResult.items) {
                            idToUser[user.id] = user;
                        }
                    })
                    .then(() => {
                        const detailedAppointments = appointments.map(appointment => {
                            (<DetailedAppointmentViewModel>appointment).vendor = idToUser[appointment.foodVendorId];
                            if (appointment.adminId) {
                                (<DetailedAppointmentViewModel>appointment).admin = idToUser[appointment.adminId];
                            }

                            return (<DetailedAppointmentViewModel>appointment);
                        });
                        return new SearchResultViewModel<DetailedAppointmentViewModel>(detailedAppointments, loadAppointmentsResult.pager);
                    })
            })
    };

    public setupAppointmentAsync(model: SetupAppointmentViewModel): IPromise<AppointmentViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/appointment/setup`;
        return this.$http
            .post<AppointmentViewModel>(fullUrl, model)
            .then(m => m.data);
    }

    //#endregion
}
