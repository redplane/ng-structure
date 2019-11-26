import {UsersService} from "./users.service";
import {IHttpParamSerializer, IHttpService} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";

export class AppointmentsService extends UsersService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings,
                       protected $httpParamSerializer: IHttpParamSerializer) {
        super($http, appSettings, $httpParamSerializer);
    }

    //#endregion

    //#region Methods

    //#endregion
}