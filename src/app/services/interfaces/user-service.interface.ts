import {LoginResultViewModel} from "../../view-models/user/login-result.view-model";
import {IHttpPromise, IPromise} from "angular";
import {ProfileViewModel} from "../../view-models/user/profile.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {LoadUserViewModel} from "../../view-models/user/load-user.view-model";

export interface IUserService {

    //#region Properties

    loadUsersResult: SearchResultViewModel<UserViewModel>;

    //#endregion

    //#region Methods

    /*
    * Do basic authentication.
    * */
    basicLoginAsync(username: string, password: string): IPromise<LoginResultViewModel>;

    /*
    * Load profile asynchronously.
    * */
    loadProfileAsync(): IPromise<ProfileViewModel>;

    /*
    * Load users asynchronously.
    * */
    loadUsersAsync(conditions: LoadUserViewModel): IPromise<SearchResultViewModel<UserViewModel>>;

    //#endregion

}
