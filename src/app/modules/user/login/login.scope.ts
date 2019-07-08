import {IScope} from "angular";
import {BasicLoginViewModel} from "../../../view-models/user/basic-login.view-model";

export interface ILoginScope extends IScope{

    //#region Properties

    loginModel: BasicLoginViewModel;

    shouldControlsAvailable: boolean;

    //#endregion

    //#region Methods

    // Called when login is clicked.
    clickLogin: () => void;

    //#endregion

}
