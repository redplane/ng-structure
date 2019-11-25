import {IStickersService} from "../interfaces/stickers-service.interface";
import {LoadStickersViewModel} from "../../view-models/stickers/load-stickers.view-model";
import {IHttpService, IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {StickerViewModel} from "../../view-models/stickers/sticker.view-model";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {AddStickerViewModel} from "../../view-models/stickers/add-sticker.view-model";
import {EditStickerViewModel} from "../../view-models/stickers/edit-sticker.view-model";

export class StickersService implements IStickersService {

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {

    }

    public loadStickersAsync(condition: LoadStickersViewModel): IPromise<SearchResultViewModel<StickerViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/sticker/search`;
        return this.$http
            .post<SearchResultViewModel<StickerViewModel>>(fullUrl, condition)
            .then(m => m.data);
    }

    public addStickerAsync(model: AddStickerViewModel): IPromise<StickerViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/sticker`;

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        const data = new FormData();
        data.append('name', model.name);
        data.append('photo', model.photo);

        return this.$http
            .post<StickerViewModel>(fullUrl, data, httpRequestOptions)
            .then(m => m.data);
    }

    public deleteStickerAsync(stickerId: string, hardDelete: boolean): IPromise<void> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/sticker?id=${stickerId}&hardDelete=${hardDelete}`;
        return this.$http
            .delete<void>(fullUrl)
            .then(m => void(0));
    }

    public editStickerAsync(stickerId: string, model: EditStickerViewModel): IPromise<StickerViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/sticker`;

        let httpRequestOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        const data = new FormData();
        data.append('stickerId', model.stickerId);

        if (model.name && model.name.hasModified) {
            data.append('name[value]', model.name.value);
            data.append('name[hasModified]', `true`);
        }

        if (model.photo && model.photo.hasModified) {
            data.append('photo', model.photo.value);
        }

        return this.$http
            .put<StickerViewModel>(fullUrl, data, httpRequestOptions)
            .then(m => m.data);
    }

}