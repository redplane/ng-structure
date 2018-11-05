import {MasterLayoutModule} from "./master-layout";
import {IModule} from "angular";

export class SharedModule {

    //#region Constructor

    public constructor(ngModule: IModule) {
        ngModule
            .config(($stateProvider) => new MasterLayoutModule($stateProvider));
    }


    //#endregion

}