import {LoadPhrasesViewModel} from "../../view-models/phrase/load-phrases.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {IPromise} from "angular";

export interface IPhrasesService {

    //#region Methods

    loadPhrasesAsync(condition: LoadPhrasesViewModel): IPromise<SearchResultViewModel<PhraseViewModel>>;

    addPhraseAsync(model: any): IPromise<PhraseViewModel>;

    editPhraseAsync(phraseId: string, model: any): IPromise<PhraseViewModel>;

    deletePhraseAsync(phraseId: string, hardDelete: boolean): IPromise<number>

    //#endregion

}
