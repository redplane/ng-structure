import {IPromise} from "angular";
import {AddStickerViewModel} from "../../../view-models/stickers/add-sticker.view-model";
import {StickerViewModel} from "../../../view-models/stickers/sticker.view-model";
import {EditStickerViewModel} from "../../../view-models/stickers/edit-sticker.view-model";
import {PhraseViewModel} from "../../../view-models/phrase/phrase.view-model";
import {AddPhraseViewModel} from "../../../view-models/phrase/add-phrase.view-model";
import {EditPhraseViewModel} from "../../../view-models/phrase/edit-phrase.view-model";

export class DetailedPhraseModalService {

    //#region Constructor

    public constructor(protected $uibModal: ng.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayAddPhraseModalAsync(): IPromise<AddPhraseViewModel> {

        const {DetailedPhraseModalController} = require('./detailed-phrase-modal.controller');
        const modalTemplate = require('./detailed-phrase-modal.html');

        return this.$uibModal
            .open({
                template: modalTemplate,
                controller: DetailedPhraseModalController,
                resolve: {
                    detailedPhrase: () => null
                },
                backdrop: 'static'
            })
            .result;
    }

    public displayEditPhraseModalAsync(phrase: PhraseViewModel): IPromise<EditPhraseViewModel> {

        const {DetailedPhraseModalController} = require('./detailed-phrase-modal.controller');
        const modalTemplate = require('./detailed-phrase-modal.html');

        return this.$uibModal
            .open({
                template: modalTemplate,
                controller: DetailedPhraseModalController,
                resolve: {
                    detailedPhrase: () => phrase
                },
                backdrop: 'static'
            })
            .result;
    }

    //#endregion

}
