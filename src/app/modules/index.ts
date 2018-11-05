import {IModule} from "angular";
import {SharedModule} from "./shared";
import {DashboardModule} from './dashboard';

export class PageModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        new SharedModule(ngModule);
        ngModule.config(($stateProvider) => new DashboardModule($stateProvider));
    }

    //#endregion
}