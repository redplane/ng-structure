import {UiService} from "./implementations/ui.service";
import {IModule} from "angular";
import {UserService} from "./implementations/user.service";
import {FaqService} from "./implementations/faq.service";
import {NgRxMessageBusService} from "./implementations/ngrx-message-bus.service";
import {StateService} from "./implementations/state.service";
import {CityService} from "./implementations/city.service";

/* @ngInject */
export class ServiceModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.service('$ui', UiService);
        ngModule.service('$users', UserService);
        ngModule.service('$faqs', FaqService);
        ngModule.service('$states', StateService);
        ngModule.service('$cities', CityService);
        ngModule.service('$messageBus', () => new NgRxMessageBusService(null));
    }

    //#endregion

    //#region Methods

    //#endregion
}
