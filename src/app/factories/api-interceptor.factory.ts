import {IHttpInterceptor, IPromise, IQService, IRequestConfig} from "angular";
import {StorageKeyNameConstant} from "../constants/storage-key-name.constant";

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
            .catch(() => {
                return requestConfig;
            })

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
