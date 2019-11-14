import {IController} from "angular";
import {StateService} from "@uirouter/core";
import {IUserService} from "../../../services/interfaces/user-service.interface";
import {IUserManagementScope} from "./user-management.scope";
import {UserViewModel} from "../../../view-models/user/user.view-model";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";

/* @ngInject */
export class UserManagementController implements IController {

    //#region Constructor

    public constructor(protected $state: StateService,
                       protected $users: IUserService,
                       protected $localForage: angular.localForage.ILocalForageService,
                       protected $scope: IUserManagementScope) {
        $scope.loadUsersResult = new SearchResultViewModel<UserViewModel>();
        $scope.shouldUsersDisplayed = this._shouldUsersDisplayed;
        $scope.clickLoadUsers = this._clickLoadUsers;
    }

    //#endregion

    //#region Methods

    // Called when login is clicked.
    private _loadUsersAsync = (): void => {
    };

    // Whether users should be displayed.
    private _shouldUsersDisplayed = (): boolean => {

        if (!this.$scope.loadUsersResult || !this.$scope.loadUsersResult.items)
            return false;

        return true;
    };

    private _clickLoadUsers = (): void => {

        this.$users
            .loadUsersAsync({})
            .then((loadUsersResult: SearchResultViewModel<UserViewModel>) => {
                this.$scope.loadUsersResult = loadUsersResult
            });

    }

    //#endregion
}
