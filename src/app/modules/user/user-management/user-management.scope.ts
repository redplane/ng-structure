import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {UserViewModel} from "../../../view-models/user/user.view-model";
import {IScope} from "angular";
import {LoadUserViewModel} from "../../../view-models/user/load-user.view-model";

export interface IUserManagementScope extends IScope {

    //#region Properties

    /*
    * Users search result.
    * */
    loadUsersResult: SearchResultViewModel<UserViewModel>;

    // Condition to load users.
    loadUsersConditions: LoadUserViewModel;

    //#endregion

    //#region Methods

    shouldUsersDisplayed(): boolean;

    clickLoadUsers(): void;

    loadUserPhoto(user: UserViewModel): string;
    
    clickViewUser(user: UserViewModel): void;

    //#endregion
}
