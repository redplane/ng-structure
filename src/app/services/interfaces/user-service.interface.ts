import {LoginResultViewModel} from "../../view-models/user/login-result.view-model";
import {IPromise} from "angular";
import {ProfileViewModel} from "../../view-models/user/profile.view-model";

export interface IUserService {

    //#region Methods

    /*
    * Do basic authentication.
    * */
    basicLoginAsync(username: string, password: string): IPromise<LoginResultViewModel>;

    /*
    * Load profile asynchronously.
    * */
    loadProfileAsync(): IPromise<ProfileViewModel>;

    //#endregion

}
