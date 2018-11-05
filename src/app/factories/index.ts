import {IModule, IQService} from "angular";
import {ApiInterceptorFactory} from "./api-interceptor.factory";

export class FactoryModule {

    //#region Constructor

    public constructor(ngModule: IModule) {
        ngModule.factory('apiInterceptor', ($injector: angular.auto.IInjectorService, $q: IQService) => new ApiInterceptorFactory($q, $injector));
    }

    //#endregion
}