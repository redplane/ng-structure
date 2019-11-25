import {IPromise} from "angular";
import {AddStickerViewModel} from "../../../view-models/stickers/add-sticker.view-model";
import {StickerViewModel} from "../../../view-models/stickers/sticker.view-model";
import {EditStateViewModel} from "../../../view-models/states/edit-state.view-model";
import {EditStickerViewModel} from "../../../view-models/stickers/edit-sticker.view-model";

export class DetailedStickerModalService {

    //#region Constructor

    public constructor(protected $uibModal: ng.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayAddStickerModalAsync(): IPromise<AddStickerViewModel> {

        const {DetailedStickerModalController} = require('./detailed-sticker-modal.controller');
        const modalTemplate = require('./detailed-sticker-modal.html');

        return this.$uibModal
            .open({
                template: modalTemplate,
                controller: DetailedStickerModalController,
                resolve: {
                    detailedSticker: () => null
                },
                backdrop: 'static'
            })
            .result;
    }

    public displayEditStickerModalAsync(sticker: StickerViewModel): IPromise<EditStickerViewModel> {

        const {DetailedStickerModalController} = require('./detailed-sticker-modal.controller');
        const modalTemplate = require('./detailed-sticker-modal.html');

        return this.$uibModal
            .open({
                template: modalTemplate,
                controller: DetailedStickerModalController,
                resolve: {
                    detailedSticker: () => sticker
                },
                backdrop: 'static'
            })
            .result;
    }

    //#endregion

}