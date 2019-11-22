import {UiService} from "./implementations/ui.service";
import {IModule} from "angular";
import {UsersService} from "./implementations/users.service";
import {FaqService} from "./implementations/faq.service";
import {NgRxMessageBusService} from "./implementations/ngrx-message-bus.service";
import {StatesService} from "./implementations/state.service";
import {CitiesService} from "./implementations/cities.service";
import {LocationPickerModalsService} from "./implementations/location-picker-modal/location-picker-modals.service";
import {RatingsService} from "./implementations/ratings.service";

/* @ngInject */
export class ServiceModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.service('$ui', UiService);
        ngModule.service('$users', UsersService);
        ngModule.service('$faqs', FaqService);
        ngModule.service('$states', StatesService);
        ngModule.service('$cities', CitiesService);
        ngModule.service('$messageBus', () => new NgRxMessageBusService(null));
        ngModule.service('$locationPickerModals', LocationPickerModalsService);
        ngModule.service('$ratings', RatingsService);
    }

    //#endregion

    //#region Methods

    //#endregion
}
