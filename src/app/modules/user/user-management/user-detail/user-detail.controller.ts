import {IController, IPromise, IQService} from "angular";
import {DetailedUserViewModel} from "../../../../view-models/user/detailed-user.view-model";
import {IUserDetailScope} from "./user-detail.scope";
import {IUsersService} from "../../../../services/interfaces/user-service.interface";
import {UserRoles} from "../../../../enums/user-roles.enum";
import {DetailedUserViewConstant} from "../../../../constants/detailed-user-view.constant";
import {UrlStatesConstant} from "../../../../constants/url-states.constant";
import {StateService} from "@uirouter/angularjs";
import {PhotoCropperModalService} from "../../../shared/photo-cropper-modal/photo-cropper-modal.service";
import {INgRxMessageBusService} from "../../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../../constants/message-event-name.constant";

/* @ngInject */
export class UserDetailController implements IController {

    //#region Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected $scope: IUserDetailScope,
                       protected $users: IUsersService,
                       protected $state: StateService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $photoCropperModals: PhotoCropperModalService,
                       protected $q: IQService) {

        $scope.detailedUser = detailedUser;
        $scope.loadUserPhoto = $users.loadUserPhoto;

        $scope.shouldFoodVendorAreaDisplayed = this._shouldFoodVendorAreaDisplayed;
        $scope.shouldAssignedLocationDisplayed = this._shouldAssignedLocationDisplayed;
        $scope.shouldPreferredLocationDisplay = this._shouldPreferredLocationDisplay;
        $scope.shouldVehicleDisplay = this._shouldPreferredLocationDisplay;
        $scope.clickChangeUserPhoto = this._clickChangeUserPhoto;

        $scope.urlStateConstants = UrlStatesConstant;
        $scope.detailedUserViewConstants = DetailedUserViewConstant;
    }

    //#endregion

    //#region Methods

    /*
    * Called when controller is initialized.
    * */
    public $onInit(): void {
    }

    //#endregion

    //#region Internal methods

    protected _shouldFoodVendorAreaDisplayed = (): boolean => {

        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodVendor, UserRoles.foodDeliveryVendor]);
    };

    protected _shouldAssignedLocationDisplayed = (): boolean => {
        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodVendor]);
    };

    protected _shouldPreferredLocationDisplay = (): boolean => {
        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodDeliveryVendor]);
    };

    protected _clickChangeUserPhoto = (detailedUser: DetailedUserViewModel): void => {
        this.$photoCropperModals
            .displayPhotoCropperModalAsync(null, {
                aspectRatio: 1 / 1,
                viewMode: 2
            })
            .then((photo: Blob) => {

                // Display loading message.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                return this.$users
                    .uploadUserPhotoAsync(this.$scope.detailedUser.id, photo)
                    .then(() => {
                        const fileReader = new FileReader();

                        const loadDataPromise: IPromise<string> = this
                            .$q(resolve => {
                                fileReader.onloadend =  () => {
                                    resolve(<string> fileReader.result);
                                }
                            });


                        fileReader.readAsDataURL(photo);
                        return loadDataPromise;
                    })
                    .then(imageUrl => {
                        this.$scope.detailedUser.photo = imageUrl;
                    })
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            });
    };

    //#endregion
}
