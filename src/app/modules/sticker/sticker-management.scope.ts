import {IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {StickerViewModel} from "../../view-models/stickers/sticker.view-model";
import {LoadStickersViewModel} from "../../view-models/stickers/load-stickers.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export interface IStickerManagementScope extends IScope {

    //#region Properties

    loadStickersResult: SearchResultViewModel<StickerViewModel>;

    loadStickersCondition: LoadStickersViewModel;

    loadingStickers: boolean;

    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    shouldStickersDisplayed(): boolean;

    clickDeleteSticker(sticker: StickerViewModel): void;

    clickReloadStickers(page?: number): void;

    clickAddSticker(): void;

    clickEditSticker(sticker: StickerViewModel): void;

    clickDeleteSticker(sticker: StickerViewModel): void;

    //#endregion

}