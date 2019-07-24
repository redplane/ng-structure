import {CityViewModel} from "../../../view-models/city/city.view-model";
import {CityDetailFormViewModel} from "../../../view-models/city/city-detail-form.view-model";
import {ICityDetailResolver} from "../../../interfaces/resolvers/city-detail.resolver";
import {StateViewModel} from "../../../view-models/state/state-view.model";
import {IPromise, IScope} from "angular";

export interface ICityDetailScope extends ng.ui.bootstrap.IModalScope, IScope {

    //#region Properties

    $resolve: ICityDetailResolver;

    inEditMode: boolean;

    /*
    * Model for adding faq.
    * */
    cityModel: CityViewModel;

    /*
    * Original state model.
    * */
    originalCityModel: CityViewModel;

    readonly addEditCityForm: CityDetailFormViewModel;

    availableStates: StateViewModel[];

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
