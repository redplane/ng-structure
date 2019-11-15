import {LoginResultViewModel} from "../../view-models/user/login-result.view-model";
import {IHttpPromise, IPromise} from "angular";
import {ProfileViewModel} from "../../view-models/user/profile.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {LoadUserViewModel} from "../../view-models/user/load-user.view-model";
import {DetailedUserViewModel} from "../../view-models/user/detailed-user.view-model";
import {UserRoles} from "../../enums/user-roles.enum";

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

    /*
    * Load users asynchronously.
    * */
    loadUsersAsync(conditions: LoadUserViewModel): IPromise<SearchResultViewModel<UserViewModel>>;

    // Load detailed user asynchronously.
    loadDetailedUserAsync(id: string): IPromise<DetailedUserViewModel>;

    // Get user photo.
    loadUserPhoto(user: UserViewModel): string;

    // Check whether user has a specific role or not.
    hasRoles(availableRoles: UserRoles[], roles: UserRoles[]): boolean;

    //#endregion

}
