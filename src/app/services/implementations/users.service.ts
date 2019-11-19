import {IUsersService} from "../interfaces/user-service.interface";
import {LoginResultViewModel} from "../../view-models/user/login-result.view-model";
import {IHttpParamSerializer, IHttpPromise, IHttpResponse, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {ProfileViewModel} from "../../view-models/user/profile.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";
import {LoadUserViewModel} from "../../view-models/user/load-user.view-model";
import {DetailedUserViewModel} from "../../view-models/user/detailed-user.view-model";
import {UserRoles} from "../../enums/user-roles.enum";
import {EditFoodVendorViewModel} from "../../view-models/user/edit-food-vendor.view-model";
import {IFoodVendor} from "../../interfaces/food-vendor.interface";

export class UsersService implements IUsersService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings,
                       protected $httpParamSerializer: IHttpParamSerializer) {
    }


    //#endregion

    //#region Methods

    public basicLoginAsync(username: string, password: string): IPromise<LoginResultViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/connect/token`;
        const model = {
            username,
            password,
            grant_type: 'password',
            client_id: 'sodakoq-app',
            client_secret: '7c0cf2bf-4a83-4077-9f0e-c7d6da8e23c0',
            scope: 'profile offline_access'
        };

        return this.$http
            .post(fullUrl, this.$httpParamSerializer(model), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((basicLoginResponse: IHttpResponse<any>) => basicLoginResponse.data)
            .then((basicLoginResult: any) => {
                const loginResult = new LoginResultViewModel();
                loginResult.accessToken = basicLoginResult.access_token;
                loginResult.refreshToken = basicLoginResult.refresh_token;
                loginResult.expiresIn = basicLoginResult.expires_in;
                loginResult.type = basicLoginResult.type;

                return loginResult;
            });
    }

    public loadProfileAsync(): IPromise<ProfileViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/user/profile`;
        return this.$http
            .get<ProfileViewModel>(fullUrl)
            .then((loadProfileResponse: IHttpResponse<ProfileViewModel>) => loadProfileResponse.data);
    }

    public loadUsersAsync(conditions: LoadUserViewModel): IPromise<SearchResultViewModel<UserViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/user/search`;
        return this.$http
            .post<SearchResultViewModel<UserViewModel>>(fullUrl, conditions)
            .then(loadUsersResponse => loadUsersResponse.data);
    }

    public loadDetailedUserAsync(id: string): IPromise<DetailedUserViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/user/profile?id=${id}`;
        return this.$http
            .get<DetailedUserViewModel>(fullUrl)
            .then(loadDetailedUserResponse => loadDetailedUserResponse.data);
    }

    public loadUserPhoto(user: UserViewModel): string {
        if (!user || !user.photo) {
            return '/assets/images/avatar.png';
        }

        return user.photo;
    }

    public hasRoles(availableRoles: UserRoles[], roles: UserRoles[]): boolean {
        if (!availableRoles) {
            return false;
        }

        if (!roles) {
            return false;
        }

        return availableRoles
            .findIndex(role => roles.indexOf(role) !== -1) !== -1;
    }

    public editFoodVendorAsync(model: EditFoodVendorViewModel): IPromise<IFoodVendor> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/food-vendor`;
        return this.$http
            .put(fullUrl, model)
            .then(editFoodVendorResponse => <IFoodVendor> editFoodVendorResponse.data);
    }

    //#endregion

}