import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../view-models/user/detailed-user.view-model";
import {IUserDetailScope} from "./user-detail.scope";
import {IUserService} from "../../../../services/interfaces/user-service.interface";
import {UserRoles} from "../../../../enums/user-roles.enum";
import {DetailedUserViewConstant} from "../../../../constants/detailed-user-view.constant";

/* @ngInject */
export class UserDetailController implements IController {

    //#region Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected $scope: IUserDetailScope,
                       protected $users: IUserService) {
        $scope.detailedUser = detailedUser;
        $scope.loadUserPhoto = $users.loadUserPhoto;
        $scope.loadDetailedUserViews = () => DetailedUserViewConstant;

        $scope.shouldVendorAreaDisplayed = this._shouldVendorAreaDisplayed;
    }

    //#endregion

    //#region Methods

    /*
    * Called when controller is initialized.
    * */
    public $onInit(): void {
        console.log(this.$scope.detailedUser);
    }

    //#endregion

    //#region Internal methods

    protected _shouldVendorAreaDisplayed = (): boolean => {

        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodDeliveryVendor, UserRoles.foodVendor]);
    };

    //#endregion
}
