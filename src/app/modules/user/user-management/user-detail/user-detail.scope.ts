import {DetailedUserViewModel} from "../../../../view-models/user/detailed-user.view-model";
import {UserViewModel} from "../../../../view-models/user/user.view-model";

export interface IUserDetailScope {

    //#region Properties

    detailedUser: DetailedUserViewModel;

    //#endregion

    //#region Methods

    loadUserPhoto(detailedUser: UserViewModel): string;

    // Whether vendor area be displayed or not.
    shouldVendorAreaDisplayed(): boolean;

    //#endregion

}