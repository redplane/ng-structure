import {IController, IPromise, IQService} from "angular";
import {ICloudDeviceManagementScope} from "./cloud-device-management.scope";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";
import {IModalButton} from "../shared/message-modal/modal-button.interface";
import {ModalButton} from "../shared/message-modal/modal-button";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {LoadCloudDeviceViewModel} from "../../view-models/cloud-device/load-cloud-device.view-model";
import {CloudDeviceViewModel} from "../../view-models/cloud-device/cloud-device.view-model";
import {ICloudDevicesService} from "../../services/interfaces/cloud-devices-service.interface";
import {IUsersService} from "../../services/interfaces/user-service.interface";
import {LoadUserViewModel} from "../../view-models/user/load-user.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";
import {PagerViewModel} from "../../view-models/pager.view-model";

export class CloudDeviceManagementController implements IController {

    //#region Constructor

    public constructor(protected $scope: ICloudDeviceManagementScope,
                       protected $cloudDevices: ICloudDevicesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $users: IUsersService,
                       protected $q: IQService) {
        $scope.loadCloudDevicesCondition = new LoadCloudDeviceViewModel();
        $scope.loadCloudDevicesResult = new SearchResultViewModel<CloudDeviceViewModel>();

        $scope.shouldCloudDevicesDisplayed = this._shouldCloudDevicesDisplayed;
        $scope.clickReloadCloudDevices = this._clickReloadCloudDevices;
        $scope.clickDeleteCloudDevice = this._clickDeleteCloudDevice;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadCloudDevices(1);
    }

    //#endregion

    //#region Internal methods

    protected _shouldCloudDevicesDisplayed = (): boolean => {
        const loadItemsResult = this.$scope.loadCloudDevicesResult;
        if (!loadItemsResult) {
            return false;
        }

        const items = loadItemsResult.items;
        return (items && items.length > 0);
    };

    protected _clickReloadCloudDevices = (page?: number): void => {

        if (page > 0) {
            this.$scope.loadCloudDevicesCondition.pager.page = page;
        }

        this.$scope.loadingCloudDevices = true;
        this._loadCloudDevicesAsync(this.$scope.loadCloudDevicesCondition)
            .then((loadCloudDevicesResult: SearchResultViewModel<CloudDeviceViewModel>) => {
                this.$scope.loadCloudDevicesResult = loadCloudDevicesResult;
            })
            .finally(() => {
                this.$scope.loadingCloudDevices = false;
            });
    };

    // protected _clickAddPhrase = (): void => {
    //     this.$detailedPhraseModals
    //         .displayAddPhraseModalAsync()
    //         .then((addPhraseModel: AddPhraseViewModel) => {
    //
    //             // Display loading screen.
    //             this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
    //             this.$scope.loadingPhrases = true;
    //
    //             return this.$phrases
    //                 .addPhraseAsync(addPhraseModel)
    //                 .then(() => {
    //                     return this.$phrases
    //                         .loadPhrasesAsync(this.$scope.loadPhrasesCondition);
    //                 })
    //                 .finally(() => {
    //                     this.$scope.loadingPhrases = false;
    //                     this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
    //                 });
    //         })
    //         .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
    //             this.$scope.loadPhrasesResult = loadPhrasesResult;
    //         })
    // };

    protected _clickDeleteCloudDevice = (cloudDevice: CloudDeviceViewModel): void => {
        const translatedTitle = this.$translate.instant('TITLE_DELETE_CLOUD_DEVICE');
        const translatedContent = this.$translate.instant('MSG_DELETE_CLOUD_DEVICE', cloudDevice);
        const translatedOk = this.$translate.instant('TITLE_OK');
        const translatedCancel = this.$translate.instant('TITLE_CANCEL');

        const buttons: IModalButton[] = [];

        buttons.push(new ModalButton(this.$q.resolve, translatedOk, {'btn btn-outline-danger': true}));
        buttons.push(new ModalButton(this.$q.reject, translatedCancel, {'btn btn-outline-secondary': true}));

        this.$messageModals
            .displayBasicModalAsync<string>({
                htmlTitle: `<b>${translatedTitle}</b>`,
                htmlContent: `${translatedContent}`,
                bodyClass: {
                    'text-center': true
                },
                footerClass: {
                    'justify-content-center': true
                },
                buttons: buttons
            })
            .then((mode: string) => {

                // Display loading screen.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

                return this.$cloudDevices
                    .deleteCloudDeviceAsync(cloudDevice.deviceId)
                    .then(() => {
                        return this._loadCloudDevicesAsync(this.$scope.loadCloudDevicesCondition);
                    })
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadCloudDevicesResult: SearchResultViewModel<CloudDeviceViewModel>) => {
                this.$scope.loadCloudDevicesResult = loadCloudDevicesResult;
            });
    };

    protected _loadCloudDevicesAsync = (condition: LoadCloudDeviceViewModel): IPromise<SearchResultViewModel<CloudDeviceViewModel>> => {

        // Mark loading progress to be pending
        this.$scope.loadingCloudDevices = true;

        this.$scope.idToUser = {};

        return this.$cloudDevices
            .loadCloudDevicesAsync(condition)
            .then((loadCloudDevicesResult: SearchResultViewModel<CloudDeviceViewModel>) => {
                const devices = loadCloudDevicesResult.items;
                if (!devices || !devices.length) {
                    return loadCloudDevicesResult;
                }

                const userIds = devices.map(device => device.userId);
                const loadUsersCondition = new LoadUserViewModel();
                loadUsersCondition.ids = userIds;
                loadUsersCondition.pager = new PagerViewModel(1, userIds.length);
                return this.$users.loadUsersAsync(loadUsersCondition)
                    .then((loadUsersResult: SearchResultViewModel<UserViewModel>) => {
                        if (!loadUsersResult) {
                            return loadCloudDevicesResult;
                        }

                        const idToUser: { [id: string]: UserViewModel } = {};
                        for (const user of loadUsersResult.items) {
                            idToUser[user.id] = user;
                        }

                        this.$scope.idToUser = idToUser;
                        return loadCloudDevicesResult;
                    })
            })
            .finally(() => {
                this.$scope.loadingCloudDevices = false;
            });
    }


    //#endregion
}
