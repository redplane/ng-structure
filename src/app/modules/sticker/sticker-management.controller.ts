import {IController, IQService} from "angular";
import {IStickersService} from "../../services/interfaces/stickers-service.interface";
import {IStickerManagementScope} from "./sticker-management.scope";
import {LoadStickersViewModel} from "../../view-models/stickers/load-stickers.view-model";
import {StickerViewModel} from "../../view-models/stickers/sticker.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {DetailedStickerModalService} from "./detailed-sticker-modal/detailed-sticker-modal.service";
import {AddStickerViewModel} from "../../view-models/stickers/add-sticker.view-model";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {EditStickerViewModel} from "../../view-models/stickers/edit-sticker.view-model";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";
import {IModalButton} from "../shared/message-modal/modal-button.interface";
import {ModalButton} from "../shared/message-modal/modal-button";

export class StickerManagementController implements IController {

    //#region Constructor

    public constructor(protected $stickers: IStickersService,
                       protected $scope: IStickerManagementScope,
                       protected $detailedStickerModals: DetailedStickerModalService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $q: IQService) {
        $scope.loadStickersCondition = new LoadStickersViewModel();
        $scope.loadStickersResult = new SearchResultViewModel<StickerViewModel>();
        $scope.masterItemAvailabilities = MasterItemAvailabilities;

        $scope.shouldStickersDisplayed = this._shouldStickersDisplayed;
        $scope.clickReloadStickers = this._clickReloadStickers;
        $scope.clickAddSticker = this._clickAddSticker;
        $scope.clickEditSticker = this._clickEditSticker;
        $scope.clickDeleteSticker = this._clickDeleteSticker;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadStickers();
    }

    //#endregion

    //#region Internal methods

    protected _shouldStickersDisplayed = (): boolean => {
        const loadStickersResult = this.$scope.loadStickersResult;
        if (!loadStickersResult) {
            return false;
        }

        const items = loadStickersResult.items;
        return (items && items.length > 0);
    };

    protected _clickReloadStickers = (page?: number): void => {

        if (page > 0) {
            this.$scope.loadStickersCondition.pager.page = page;
        }

        this.$scope.loadingStickers = true;
        this.$stickers
            .loadStickersAsync(this.$scope.loadStickersCondition)
            .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
                this.$scope.loadStickersResult = loadStickersResult;
            })
            .finally(() => {
                this.$scope.loadingStickers = false;
            });
    };

    protected _clickAddSticker = (): void => {
        this.$detailedStickerModals
            .displayAddStickerModalAsync()
            .then((addStickerModel: AddStickerViewModel) => {

                // Display loading screen.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

                return this.$stickers
                    .addStickerAsync(addStickerModel)
                    .then(() => {
                        return this.$stickers
                            .loadStickersAsync(this.$scope.loadStickersCondition);
                    })
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
                this.$scope.loadStickersResult = loadStickersResult;
            })
    };

    protected _clickEditSticker = (sticker: StickerViewModel): void => {
        this.$detailedStickerModals
            .displayEditStickerModalAsync(sticker)
            .then((editStickerModel: EditStickerViewModel) => {

                // Display loading screen.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

                return this.$stickers
                    .editStickerAsync(editStickerModel.stickerId, editStickerModel)
                    .then(() => {
                        return this.$stickers
                            .loadStickersAsync(this.$scope.loadStickersCondition);
                    })
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
                this.$scope.loadStickersResult = loadStickersResult;
            })
    };

    protected _clickDeleteSticker = (sticker: StickerViewModel): void => {
        const translatedTitle = this.$translate.instant('TITLE_DELETE_STICKER', sticker);
        const translatedContent = this.$translate.instant('MSG_DELETE_STICKER', sticker);
        const translatedHardDelete = this.$translate.instant('TITLE_HARD_DELETE');
        const translatedSoftDelete = this.$translate.instant('TITLE_SOFT_DELETE');
        const translatedCancel = this.$translate.instant('TITLE_CANCEL');

        const buttons: IModalButton[] = [];
        buttons.push(new ModalButton(() => this.$q.resolve('HARD_DELETE'), translatedHardDelete, {'btn btn-danger': true}));

        if (sticker.availability == MasterItemAvailabilities.available) {
            buttons.push(new ModalButton(() => this.$q.resolve('SOFT_DELETE'), translatedSoftDelete, {'btn btn-outline-danger': true}));
        }

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

                return this.$stickers
                    .deleteStickerAsync(sticker.id, mode == 'HARD_DELETE')
                    .then(() => {
                        return this.$stickers
                            .loadStickersAsync(this.$scope.loadStickersCondition);
                    })
                    .finally(() =>  this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false));
            })
            .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
                this.$scope.loadStickersResult = loadStickersResult;
            })

    };

    //#endregion
}