import {LoadStickersViewModel} from "../../view-models/stickers/load-stickers.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {StickerViewModel} from "../../view-models/stickers/sticker.view-model";
import {IPromise} from "angular";
import {AddStickerViewModel} from "../../view-models/stickers/add-sticker.view-model";
import {EditStickerViewModel} from "../../view-models/stickers/edit-sticker.view-model";

export interface IStickersService {

    //#region Methods

    addStickerAsync(model: AddStickerViewModel): IPromise<StickerViewModel>;

    editStickerAsync(stickerId: string, model: EditStickerViewModel): IPromise<StickerViewModel>;

    deleteStickerAsync(stickerId: string, hardDelete: boolean): IPromise<void>;

    loadStickersAsync(condition: LoadStickersViewModel): IPromise<SearchResultViewModel<StickerViewModel>>;

    //#endregion

}