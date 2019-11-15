import {DetailedUserViewModel} from "../../../../view-models/user/detailed-user.view-model";
import {UserViewModel} from "../../../../view-models/user/user.view-model";
import {DetailedUserViewConstant} from "../../../../constants/detailed-user-view.constant";
import {IScope} from "angular";

export interface IUserDetailScope extends IScope {

    //#region Properties

    detailedUser: DetailedUserViewModel;

    //#endregion

    //#region Methods

    loadUserPhoto(detailedUser: UserViewModel): string;

    // Whether vendor area be displayed or not.
    shouldVendorAreaDisplayed(): boolean;

    loadDetailedUserViews(): DetailedUserViewConstant;

    //#endregion

}
