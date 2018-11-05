import {IHttpInterceptor, IPromise, IQService, IRequestConfig} from "angular";

export class ApiInterceptorFactory implements IHttpInterceptor {

    //#region Methods

    // Trigger when request is being prepared.
    request = (httpRequestConfiguration: IRequestConfig): IRequestConfig | IPromise<IRequestConfig> => {
        return httpRequestConfiguration;
    };


    //#endregion

    //#region Constructor

    // Initialize interceptor with settings.
    public constructor(public $q: IQService,
                       public $injector: angular.auto.IInjectorService) {
    }

    //#endregion
}