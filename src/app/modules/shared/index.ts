import {StateProvider} from "@uirouter/angularjs";
import {AuthenticatedLayoutModule} from "./authenticated-layout";
import {UnauthenticatedLayoutModule} from "./unauthenticated-layout";

/* @ngInject */
export class SharedModule {

    //#region Constructor

    public constructor($stateProvider: StateProvider) {
        new AuthenticatedLayoutModule($stateProvider);
        new UnauthenticatedLayoutModule($stateProvider);
    }

    //#endregion
}
