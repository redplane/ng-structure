import {IModule} from "angular";
import {OcLazyLoadConfig} from './oc-lazy-load.config';
import {AngularTranslateConfig} from "./angular-translate.config";
import {BlockUiConfig} from "./block-ui.config";

export class ConfigModule {

    //#region Properties

    public constructor(ngModule: IModule){

        // Add oc-lazy-load configuration.
        new OcLazyLoadConfig(ngModule);

        // Add angular-translate configuration.
        new AngularTranslateConfig(ngModule);

        // Add block-ui configuration.
        new BlockUiConfig(ngModule);
    }

    //#endregion
}