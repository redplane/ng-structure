import {IController, IQService} from "angular";
import {IStickersService} from "../../services/interfaces/stickers-service.interface";
import {IPhraseManagementScope, IStickerManagementScope} from "./phrase-management.scope";
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
import {LoadPhrasesViewModel} from "../../view-models/phrase/load-phrases.view-model";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {IPhrasesService} from "../../services/interfaces/phrases-service.interface";

export class PhraseManagementController implements IController {

    //#region Constructor

    public constructor(protected $scope: IPhraseManagementScope,
                       protected $phrases: IPhrasesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $q: IQService) {
        $scope.loadPhrasesCondition = new LoadPhrasesViewModel();
        $scope.loadPhrasesResult = new SearchResultViewModel<PhraseViewModel>();
        $scope.masterItemAvailabilities = MasterItemAvailabilities;

        $scope.shouldPhrasesDisplayed = this._shouldStickersDisplayed;
        $scope.clickReloadPhrases = this._clickReloadPhrases;
        $scope.clickAddPhrase = this._clickAddPhrase;
        // $scope.clickEditPhrase = this._clickEditPhrase;
        // $scope.clickDeletePhrase = this._clickDeletePhrase;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadPhrases();
    }

    //#endregion

    //#region Internal methods

    protected _shouldStickersDisplayed = (): boolean => {
        const loadPhrasesResult = this.$scope.loadPhrasesResult;
        if (!loadPhrasesResult) {
            return false;
        }

        const items = loadPhrasesResult.items;
        return (items && items.length > 0);
    };

    protected _clickReloadPhrases = (page?: number): void => {

        if (page > 0) {
            this.$scope.loadPhrasesCondition.pager.page = page;
        }

        this.$scope.loadingPhrases = true;
        this.$phrases
            .loadPhrasesAsync(this.$scope.loadPhrasesCondition)
            .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
                this.$scope.loadPhrasesResult = loadPhrasesResult;
            })
            .finally(() => {
                this.$scope.loadingPhrases = false;
            });
    };

    protected _clickAddPhrase = (): void => {
        // this.$detailedStickerModals
        //     .displayAddStickerModalAsync()
        //     .then((addStickerModel: AddStickerViewModel) => {
        //
        //         // Display loading screen.
        //         this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
        //
        //         return this.$stickers
        //             .addStickerAsync(addStickerModel)
        //             .then(() => {
        //                 return this.$stickers
        //                     .loadStickersAsync(this.$scope.loadStickersCondition);
        //             })
        //             .finally(() => {
        //                 this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
        //             });
        //     })
        //     .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
        //         this.$scope.loadStickersResult = loadStickersResult;
        //     })
    };

    protected _clickEditPhrase = (sticker: StickerViewModel): void => {
        // this.$detailedStickerModals
        //     .displayEditStickerModalAsync(sticker)
        //     .then((editStickerModel: EditStickerViewModel) => {
        //
        //         // Display loading screen.
        //         this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
        //
        //         return this.$stickers
        //             .editStickerAsync(editStickerModel.stickerId, editStickerModel)
        //             .then(() => {
        //                 return this.$stickers
        //                     .loadStickersAsync(this.$scope.loadStickersCondition);
        //             })
        //             .finally(() => {
        //                 this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
        //             });
        //     })
        //     .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
        //         this.$scope.loadStickersResult = loadStickersResult;
        //     })
    };

    protected _clickDeletePhrase = (sticker: StickerViewModel): void => {
        // const translatedTitle = this.$translate.instant('TITLE_DELETE_STICKER', sticker);
        // const translatedContent = this.$translate.instant('MSG_DELETE_STICKER', sticker);
        // const translatedDelete = this.$translate.instant('TITLE_DELETE');
        // const translatedSoftDelete = this.$translate.instant('TITLE_SOFT_DELETE');
        // const translatedCancel = this.$translate.instant('TITLE_CANCEL');
        //
        // const buttons: IModalButton[] = [];
        // buttons.push(new ModalButton(() => this.$q.resolve('HARD_DELETE'), translatedHardDelete, {'btn btn-danger': true}));
        //
        // if (sticker.availability == MasterItemAvailabilities.available) {
        //     buttons.push(new ModalButton(() => this.$q.resolve('SOFT_DELETE'), translatedSoftDelete, {'btn btn-outline-danger': true}));
        // }
        //
        // buttons.push(new ModalButton(this.$q.reject, translatedCancel, {'btn btn-outline-secondary': true}));
        //
        // this.$messageModals
        //     .displayBasicModalAsync<string>({
        //         htmlTitle: `<b>${translatedTitle}</b>`,
        //         htmlContent: `${translatedContent}`,
        //         bodyClass: {
        //             'text-center': true
        //         },
        //         footerClass: {
        //             'justify-content-center': true
        //         },
        //         buttons: buttons
        //     })
        //     .then((mode: string) => {
        //
        //         // Display loading screen.
        //         this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
        //
        //         return this.$stickers
        //             .deleteStickerAsync(sticker.id, mode == 'HARD_DELETE')
        //             .then(() => {
        //                 return this.$stickers
        //                     .loadStickersAsync(this.$scope.loadStickersCondition);
        //             })
        //             .finally(() =>  this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false));
        //     })
        //     .then((loadStickersResult: SearchResultViewModel<StickerViewModel>) => {
        //         this.$scope.loadStickersResult = loadStickersResult;
        //     })

    };

    //#endregion
}