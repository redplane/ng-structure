import {IScope} from "angular";

export interface ILoginScope extends IScope{

    //#region Methods

    // Called when login is clicked.
    ngOnLoginClicked: () => void;

    //#endregion

}