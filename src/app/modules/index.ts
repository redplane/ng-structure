import {IModule} from "angular";
import {SharedModule} from "./shared";
import {DashboardModule} from './dashboard';
import {StateProvider} from "@uirouter/angularjs";
import {LoginModule} from "./user/login";
import {FaqModule} from "./faq";
import {StateModule} from "./state";
import {CityModule} from "./city";
import {UserManagementModule} from "./user/user-management";
import {UserDetailModule} from "./user/user-management/user-detail";
import {RatingModule} from "./rating";
import {StickerModule} from "./sticker";
import {PhraseModule} from "./phrase";
import {CloudDeviceModule} from "./cloud-device";
import {AppointmentModule} from "./appointment";
import {FoodModule} from "./food";

export class PageModule {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.config(($stateProvider: StateProvider) => new SharedModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new DashboardModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new LoginModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new FaqModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new StateModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new CityModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new UserManagementModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new UserDetailModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new RatingModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new StickerModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new PhraseModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new CloudDeviceModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new AppointmentModule($stateProvider));
        ngModule.config(($stateProvider: StateProvider) => new FoodModule($stateProvider));
    }

    //#endregion
}
