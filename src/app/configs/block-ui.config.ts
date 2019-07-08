import {IModule} from "angular";

export class BlockUiConfig {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.config((blockUIConfig: angular.blockUI.BlockUIConfig) => {
            blockUIConfig.autoInjectBodyBlock = false;
            blockUIConfig.template = '<pre><code>{{ state | json }}</code></pre>';
        });
    }

    //#endregion
}
