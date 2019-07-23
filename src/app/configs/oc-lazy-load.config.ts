import {IModule} from "angular";
import {ILazyLoadProvider} from "oclazyload";

export class OcLazyLoadConfig {

    //#region Constructor

    public constructor(ngModule: IModule) {
        ngModule.config(($ocLazyLoadProvider: ILazyLoadProvider) => {
            $ocLazyLoadProvider
                .config({
                    debug: false
                });
        });
    }

    //#endregion
}
