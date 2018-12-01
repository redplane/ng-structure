import {IModule} from "angular";
import {SharedModule} from "./shared";
import {DashboardModule} from './dashboard';
import {StateProvider} from "@uirouter/angularjs";
import {LoginModule} from "./user/login";

export class PageModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.config(($stateProvider: StateProvider) => new SharedModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new DashboardModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new LoginModule($stateProvider));
    }

    //#endregion
}