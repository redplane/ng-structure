import {UiService} from "./implementations/ui.service";
import {IModule} from "angular";
import {UsersService} from "./implementations/users.service";
import {FaqService} from "./implementations/faq.service";
import {NgRxMessageBusService} from "./implementations/ngrx-message-bus.service";
import {StatesService} from "./implementations/states.service";
import {CitiesService} from "./implementations/cities.service";
import {LocationPickerModalsService} from "../modules/shared/location-picker-modal/location-picker-modals.service";
import {RatingsService} from "./implementations/ratings.service";
import {StickersService} from "./implementations/stickers.service";
import {PhrasesService} from "./implementations/phrases.service";
import {CloudDevicesService} from "./implementations/cloud-devices.service";
import {AppointmentsService} from "./implementations/appointments.service";
import {FoodsService} from "./implementations/foods.service";
import {FilesService} from "./implementations/files.service";

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
        ngModule.service('$stickers', StickersService);
        ngModule.service('$phrases', PhrasesService);
        ngModule.service('$cloudDevices', CloudDevicesService);
        ngModule.service('$appointments', AppointmentsService);
        ngModule.service('$foods', FoodsService);
        ngModule.service('$files', FilesService);
    }

    //#endregion

    //#region Methods

    //#endregion
}
