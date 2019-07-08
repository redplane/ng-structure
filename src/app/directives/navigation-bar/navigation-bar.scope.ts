import {IScope} from "angular";
import {ProfileViewModel} from "../../view-models/user/profile.view-model";

export interface INavigationBarScope extends IScope {

    //#region Properties

    // Raise event when sign out is clicked.
    readonly ngOnSignOutClicked: () => void | null;

    // Profile information.
    profile: ProfileViewModel;

    //#endregion

    //#region Methods

    // Called when sign out button is clicked.
    clickSignOut: ($event: Event) => void;

    //#endregion
}
