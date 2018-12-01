import {IScope} from "angular";

export interface INavigationBarScope extends IScope {

    //#region Properties

    // Raise event when sign out is clicked.
    readonly ngOnSignOutClicked: () => void | null;

    //#endregion

    //#region Methods

    // Called when sign out button is clicked.
    ngClickedSignOut: ($event: Event) => void;

    //#endregion
}