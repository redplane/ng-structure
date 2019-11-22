import {IHttpInterceptor, IHttpResponse, IPromise, IQService, IRequestConfig} from "angular";
import {StorageKeyNameConstant} from "../constants/storage-key-name.constant";
import {StateService} from "@uirouter/core";
import {UrlStatesConstant} from "../constants/url-states.constant";
import {StateProvider} from "@uirouter/angularjs";

export class ApiInterceptorFactory implements IHttpInterceptor {

    //#region Methods

    // Trigger when request is being prepared.
    request = (requestConfig: IRequestConfig): IRequestConfig | IPromise<IRequestConfig> => {

        // Get access token from storage.
        return this.$localForage
            .getItem(StorageKeyNameConstant.accessToken)
            .then((accessToken: string) => {
                requestConfig.headers = {
                    ...requestConfig.headers,
                    'Authorization': `Bearer ${accessToken}`
                };
                return requestConfig;
            })
            .catch((httpResponse: IHttpResponse<any>) => {
                return requestConfig;
            })

    };

    responseError = (rejection: any): IPromise<IHttpResponse<any>> | IHttpResponse<any> => {

        // Get states service.
        if (rejection.status === 401) {

            const $state: StateService = this.$injector.get('$state');
            if ($state.current.name === UrlStatesConstant.loginModuleName) {
                return rejection;
            }

            $state.go(UrlStatesConstant.loginModuleName);
        }

        return rejection;
    };

    //#endregion

    //#region Constructor

    // Initialize interceptor with settings.
    public constructor(protected $q: IQService,
                       protected $injector: angular.auto.IInjectorService,
                       protected $localForage: angular.localForage.ILocalForageService) {
    }

    //#endregion
}
