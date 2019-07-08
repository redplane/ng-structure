import {UiService} from "./implementations/ui.service";
import {IModule} from "angular";
import {UserService} from "./implementations/user.service";
import {FaqService} from "./implementations/faq.service";

/* @ngInject */
export class ServiceModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.service('$ui', UiService);
        ngModule.service('$user', UserService);
        ngModule.service('$faq', FaqService);
    }

    //#endregion

    //#region Methods

    //#endregion
}
