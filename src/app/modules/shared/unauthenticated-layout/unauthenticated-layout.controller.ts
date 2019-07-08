import {IController} from "angular";
import {StateService} from "@uirouter/core";
import {IUnauthenticatedLayoutScope} from "./unauthenticated-layout.scope";

/* @ngInject */
export class UnauthenticatedLayoutController implements IController {

    //#region Constructor

    public constructor(public $scope: IUnauthenticatedLayoutScope,
                       public $state: StateService) {
    }

    //#endregion

    //#region Methods

    //#endregion
}
