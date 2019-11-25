import {IPhrasesService} from "../interfaces/phrases-service.interface";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {LoadPhrasesViewModel} from "../../view-models/phrase/load-phrases.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {IHttpPromise, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {EditPhraseViewModel} from "../../view-models/phrase/edit-phrase.view-model";

export class PhrasesService implements IPhrasesService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {

    }

    //#endregion

    //#region Methods

    public addPhraseAsync(model: any): IPromise<PhraseViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/phrase`;
        return this.$http
            .post<PhraseViewModel>(fullUrl, model)
            .then(m => m.data);
    }

    public deletePhraseAsync(phraseId: string, hardDelete: boolean): IPromise<number> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/phrase?phraseId=${phraseId}&shouldRecordHardDelete=${hardDelete}`;
        return this.$http
            .delete<number>(fullUrl)
            .then(m => m.data);
    }

    public editPhraseAsync(phraseId: string, model: EditPhraseViewModel): IPromise<PhraseViewModel> {
        const editPhraseModel = {...model};
        editPhraseModel.phraseId = phraseId;
        const fullUrl = `${this.appSettings.apiEndpoint}/api/phrase`;
        return this.$http
            .put<PhraseViewModel>(fullUrl, editPhraseModel)
            .then(m => m.data);
    }

    public loadPhrasesAsync(condition: LoadPhrasesViewModel): IPromise<SearchResultViewModel<PhraseViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/phrase/search`;
        return this.$http
            .post<SearchResultViewModel<PhraseViewModel>>(fullUrl, condition)
            .then(m => m.data);
    }


    //#endregion
}
