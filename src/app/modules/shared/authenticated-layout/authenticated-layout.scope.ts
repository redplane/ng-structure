import {IScope} from "angular";
import {ProfileViewModel} from "../../../view-models/user/profile.view-model";

export interface IAuthenticatedLayoutScope extends IScope {

    //#region Properties

    profile: ProfileViewModel;

    //#endregion

    //#region Methods

    /*
    * Called when sign out is clicked.
    * */
    ngOnSignOutClicked: () => void;

    //#endregion
}
