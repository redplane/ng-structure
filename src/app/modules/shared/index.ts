import {StateProvider} from "@uirouter/angularjs";
import {MasterLayoutModule} from "./master-layout";

/* @ngInject */
export class SharedModule {

    //#region Constructor

    public constructor($stateProvider: StateProvider) {
        new MasterLayoutModule($stateProvider);
    }


    //#endregion

}