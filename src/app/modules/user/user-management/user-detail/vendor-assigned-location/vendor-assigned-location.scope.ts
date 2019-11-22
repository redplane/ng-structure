import {IScope} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IRegion} from "../../../../../interfaces/region.interface";
import {StateViewModel} from "../../../../../view-models/states/state-view.model";
import {CityViewModel} from "../../../../../view-models/city/city.view-model";

export interface IVendorAssignedLocationScope extends IScope {

    //#region Properties

    detailedUser: DetailedUserViewModel;

    assignedLocations: IRegion[];

    idToState: {[key: string]: StateViewModel};

    idToCity: {[key: string]: CityViewModel};

    loadingAssignedLocations: boolean;

    //#endregion

    //#region Methods

    // Load assigned locations.
    loadAssignedLocations(): IRegion[];

    clickAddAssignedLocation(): void;

    clickDeleteAssignedLocation(item: IRegion): void;

    clickUpdateAssignedLocations(): void;

    //#endregion
}
