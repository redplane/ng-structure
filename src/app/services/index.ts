import {UiService} from "./ui.service";
import {IModule} from "angular";

/* @ngInject */
export class ServiceModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.service('$ui', UiService);
    }

    //#endregion

    //#region Methods

    //#endregion
}