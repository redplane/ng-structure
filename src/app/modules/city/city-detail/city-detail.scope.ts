import {CityViewModel} from "../../../view-models/city/city.view-model";
import {CityDetailFormViewModel} from "../../../view-models/city/city-detail-form.view-model";
import {ICityDetailResolver} from "../../../interfaces/resolvers/city-detail.resolver";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {IPromise, IScope} from "angular";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {KeyValueModel} from "../../../models/key-value.model";

export interface ICityDetailScope extends ng.ui.bootstrap.IModalScope, IScope {

    //#region Properties

    $resolve: ICityDetailResolver;

    inEditMode: boolean;

    /*
    * Model for adding faq.
    * */
    cityModel: CityViewModel;

    /*
    * Original states model.
    * */
    originalCityModel: CityViewModel;

    /*
    * Add edit city form.
    * */
    readonly addEditCityForm: CityDetailFormViewModel;

    /*
    * Available states that loaded in the system.
    * */
    availableStates: StateViewModel[];

    /*
    * Availabilities.
    * */
    availabilities: KeyValueModel<MasterItemAvailabilities>[];

    //#endregion

    //#region Methods

    /*
    * Called when cancel is clicked.
    * */
    clickCancel(): void;

    /*
    * Called when ok is clicked.
    * */
    clickOk(form: CityDetailFormViewModel): void;

    //#endregion
}
