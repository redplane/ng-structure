import {IController} from "angular";
import {ILoginScope} from "./login.scope";
import {StateService} from "@uirouter/core";
import {IUsersService} from "../../../services/interfaces/user-service.interface";
import {BasicLoginViewModel} from "../../../view-models/user/basic-login.view-model";
import {LoginResultViewModel} from "../../../view-models/user/login-result.view-model";
import {StorageKeyNameConstant} from "../../../constants/storage-key-name.constant";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";

/* @ngInject */
export class LoginController implements IController {

    //#region Constructor

    public constructor(protected $scope: ILoginScope,
                       protected $state: StateService,
                       protected $users: IUsersService,
                       protected $localForage: angular.localForage.ILocalForageService,
                       protected $messageBus: INgRxMessageBusService) {

        // Property initialize.
        this.$scope.loginModel = new BasicLoginViewModel();
        this.$scope.shouldControlsAvailable = true;

        // Methods binding.
        $scope.clickLogin = this._clickLogin;
    }

    //#endregion

    //#region Methods

    // Called when login is clicked.
    private _clickLogin = (): void => {

        // Get login information.
        const loginModel = this.$scope.loginModel;

        // Disable all controls.
        this.$scope.shouldControlsAvailable = false;

        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$users
            .basicLoginAsync(loginModel.username, loginModel.password)
            .then((basicLoginResult: LoginResultViewModel) => {
                const addAccessTokenToStoragePromise = this.$localForage.setItem(StorageKeyNameConstant.accessToken, basicLoginResult.accessToken);
                const addRefreshTokenToStoragePromise = this.$localForage.setItem(StorageKeyNameConstant.refreshToken, basicLoginResult.refreshToken);

                const accessTokenExpiredTime = new Date().getTime() + (basicLoginResult.expiresIn * 1000);
                const addTokenExpiredTime = this.$localForage.setItem(StorageKeyNameConstant.accessTokenExpiredTime, accessTokenExpiredTime);
                return Promise.all([addAccessTokenToStoragePromise, addRefreshTokenToStoragePromise, addTokenExpiredTime]);
            })
            .then(() => {
                return this.$state.go(UrlStatesConstant.faqMasterPageModuleName);
            })
            .finally(() => {
                this.$scope.shouldControlsAvailable = true;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    }

    //#endregion
}
