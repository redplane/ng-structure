import {DetailedUserViewModel} from "../../../../view-models/user/detailed-user.view-model";
import {UserViewModel} from "../../../../view-models/user/user.view-model";
import {DetailedUserViewConstant} from "../../../../constants/detailed-user-view.constant";
import {IScope} from "angular";
import {UrlStatesConstant} from "../../../../constants/url-states.constant";

export interface IUserDetailScope extends IScope {

    //#region Properties

    detailedUser: DetailedUserViewModel;

    urlStateConstants: UrlStatesConstant;

    detailedUserViewConstants: DetailedUserViewConstant;

    //#endregion

    //#region Methods

    loadUserPhoto(detailedUser: UserViewModel): string;

    // Whether vendor area be displayed or not.
    shouldFoodVendorAreaDisplayed(): boolean;

    // Whether assigned location be displayed or not.
    shouldAssignedLocationDisplayed(): boolean;

    // Whether preferred location should be displayed or not.
    shouldPreferredLocationDisplay(): boolean;

    // Whether vehicle area should be displayed.
    shouldVehicleDisplay(): boolean;

    clickChangeUserPhoto(detailedUser: DetailedUserViewModel): void;

    //#endregion

}
