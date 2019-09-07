import {IModule} from "angular";

export class PaginationConfig {

    //#region Constructor

    public constructor(ngModule: IModule) {

        ngModule.constant('uibPaginationConfig', {
            firstText: '&lt;&lt;',
            previousText: '&lt;',
            nextText: '&gt;',
            lastText: '&gt;&gt;'
        });
    }

    //#endregion

}
