import {IScope} from "angular";

export interface IAuthorizedLayoutScope extends IScope {

    //#region Methods

    /*
    * Called when sign out is clicked.
    * */
    ngOnSignOutClicked: () => void;

    //#endregion
}