import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {UserViewModel} from "../../../view-models/user/user.view-model";

export interface IUserManagementScope {

    //#region Properties

    /*
    * Users search result.
    * */
    loadUsersResult: SearchResultViewModel<UserViewModel>;

    //#endregion

    //#region Methods

    shouldUsersDisplayed(): boolean;

    clickLoadUsers(): void;

    //#endregion
}
