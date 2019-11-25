import {IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {LoadPhrasesViewModel} from "../../view-models/phrase/load-phrases.view-model";

export interface IPhraseManagementScope extends IScope {

    //#region Properties

    loadPhrasesResult: SearchResultViewModel<PhraseViewModel>;

    loadPhrasesCondition: LoadPhrasesViewModel;

    loadingPhrases: boolean;

    masterItemAvailabilities: typeof MasterItemAvailabilities;

    //#endregion

    //#region Methods

    shouldPhrasesDisplayed(): boolean;

    clickDeletePhrase(phrase: PhraseViewModel): void;

    clickReloadPhrases(page?: number): void;

    clickAddPhrase(): void;

    clickEditPhrase(phrase: PhraseViewModel): void;

    clickDeletePhrase(phrase: PhraseViewModel): void;

    clickRestorePhrase(phrase: PhraseViewModel): void;

    //#endregion

}
