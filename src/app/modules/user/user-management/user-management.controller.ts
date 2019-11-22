import {IController} from "angular";
import {StateService} from "@uirouter/core";
import {IUsersService} from "../../../services/interfaces/user-service.interface";
import {IUserManagementScope} from "./user-management.scope";
import {UserViewModel} from "../../../view-models/user/user.view-model";
import {SearchResultViewModel} from "../../../view-models/search-result.view-model";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {LoadUserViewModel} from "../../../view-models/user/load-user.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../constants/validation-value.constant";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {DetailedUserStateParams} from "../../../models/route-params/detailed-user-state-params";

/* @ngInject */
export class UserManagementController implements IController {

    //#region Constructor

    public constructor(protected $state: StateService,
                       protected $users: IUsersService,
                       protected $localForage: angular.localForage.ILocalForageService,
                       protected $scope: IUserManagementScope,
                       protected $messageBus: INgRxMessageBusService) {

        const loadUsersPager = new PagerViewModel();
        loadUsersPager.page = 1;
        loadUsersPager.records = ValidationValueConstant.maxUserSearchRecords;

        $scope.loadUsersConditions = new LoadUserViewModel(loadUsersPager);
        $scope.loadUsersResult = new SearchResultViewModel<UserViewModel>();
        $scope.shouldUsersDisplayed = this._shouldUsersDisplayed;
        $scope.loadUserPhoto = $users.loadUserPhoto;
        $scope.clickViewUser = this._clickViewUser;
    }

    //#endregion

    //#region Methods

    // Called when login is clicked.
    public $onInit(): void {

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$users
            .loadUsersAsync(this.$scope.loadUsersConditions)
            .then((loadUsersResult: SearchResultViewModel<UserViewModel>) => {
                this.$scope.loadUsersResult = loadUsersResult
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    }

    // Whether users should be displayed.
    private _shouldUsersDisplayed = (): boolean => {

        if (!this.$scope.loadUsersResult || !this.$scope.loadUsersResult.items)
            return false;

        return true;
    };

    private _clickViewUser = (user: UserViewModel) => {
        if (!user) {
            console.error('No user is found');
            return;
        }

        // Display loading ui.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        const routeParams = new DetailedUserStateParams(user.id);
        this.$state
            .go(UrlStatesConstant.detailedUserModuleName, routeParams)
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    //#endregion
}
