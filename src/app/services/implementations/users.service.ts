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
import {EditFoodDeliveryVendorModel} from "../../models/edit-food-delivery-vendor.model";
import {IFoodDeliveryVendor} from "../../interfaces/food-delivery-vendor.interface";
import {EditableFieldViewModel} from "../../view-models/editable-field.view-model";

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

    public editFoodDeliveryVendorAsync(userId: string, model: EditFoodDeliveryVendorModel): IPromise<IFoodDeliveryVendor> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/delivery-vendor/profile`;
        const data = new FormData();

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        // TODO: Vehicle implementation.
        // Get keys.
        const validKeys = ['name', 'icNo', 'phoneNo'];
        for (const key of validKeys) {
            const keyValue = <EditableFieldViewModel<any>> model[key];
            if (!keyValue || !keyValue.hasModified) {
                continue;
            }

            data.append(`${key}[value]`, keyValue.value);
            data.append(`${key}[hasModified]`, 'true');
        }

        const address = model.address;
        if (address && address.value && address.hasModified) {
            data.append('address[value][cityId]', address.value.cityId);
            data.append('address[value][stateId]', address.value.stateId);
            data.append('address[value][postalCode][latitude]', `${address.value.coordinate.latitude}`);
            data.append('address[value][coordinate][longitude]', `${address.value.coordinate.longitude}`);
            data.append('address[value][auxiliaryAddress]', `${address.value.auxiliaryAddress}`);
            data.append('address[value][addressText]', `${address.value.addressText}`);
            data.append('address[hasModified]', 'true');
        }

        // Preferred locations.
        const preferredLocationModel = model.preferredLocations;
        if (preferredLocationModel && preferredLocationModel.hasModified) {
            const locations = preferredLocationModel.value;
            if (locations && locations.length) {
                data.append('preferredLocations.hasModified', 'true');
                for (let index = 0; index < locations.length; index++) {
                    const location = locations[index];
                    data.append(`preferredLocations.value[${index}].stateId`, location.stateId);
                    data.append(`preferredLocations.value[${index}].cityId`, location.cityId);
                }
            }
        }

        if (model.photo) {
            data.append(`photo`, model.photo);
        }

        // Add user id into request.
        data.append('userId', userId);

        return this.$http
            .put(fullUrl, data, httpRequestOptions)
            .then((editFoodDeliveryVendorResponse: IHttpResponse<IFoodDeliveryVendor>) => {
                return editFoodDeliveryVendorResponse.data;
            });
    }

    //#endregion

}
