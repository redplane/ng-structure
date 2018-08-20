import {LoginViewModel} from "../../../view-models/user/login.view-model";

export interface ILoginScope extends ng.IScope {

    //#region Properties

    /*
    * Login information.
    * */
    loginModel: LoginViewModel;

    //#endregion

    //#region Methods

    /*
    * Called when login is clicked.
    * */
    clickLogin: Function;

    hasEmail: () => boolean;

    //#endregion
}