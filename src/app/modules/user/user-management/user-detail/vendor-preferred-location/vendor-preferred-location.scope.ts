import {IScope} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IRegion} from "../../../../../interfaces/region.interface";
import {StateViewModel} from "../../../../../view-models/states/state-view.model";
import {CityViewModel} from "../../../../../view-models/city/city.view-model";

export interface IVendorPreferredLocationScope extends IScope {

    //#region Properties

    detailedUser: DetailedUserViewModel;

    preferredLocations: IRegion[];

    idToState: {[key: string]: StateViewModel};

    idToCity: {[key: string]: CityViewModel};

    loadingPreferredLocations: boolean;

    //#endregion

    //#region Methods

    // Load assigned locations.
    loadPreferredLocations(): IRegion[];

    clickAddPreferredLocation(): void;

    clickDeleteAssignedLocation(item: IRegion): void;

    clickUpdateAssignedLocations(): void;

    //#endregion
}
