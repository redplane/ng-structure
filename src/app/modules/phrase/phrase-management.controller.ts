import {IController, IQService} from "angular";
import {IPhraseManagementScope} from "./phrase-management.scope";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";
import {LoadPhrasesViewModel} from "../../view-models/phrase/load-phrases.view-model";
import {PhraseViewModel} from "../../view-models/phrase/phrase.view-model";
import {IPhrasesService} from "../../services/interfaces/phrases-service.interface";
import {IModalButton} from "../shared/message-modal/modal-button.interface";
import {ModalButton} from "../shared/message-modal/modal-button";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {AddPhraseViewModel} from "../../view-models/phrase/add-phrase.view-model";
import {DetailedPhraseModalService} from "./detailed-phrase-modal/detailed-phrase-modal.service";
import {EditPhraseViewModel} from "../../view-models/phrase/edit-phrase.view-model";
import {EditableFieldViewModel} from "../../view-models/editable-field.view-model";

export class PhraseManagementController implements IController {

    //#region Constructor

    public constructor(protected $scope: IPhraseManagementScope,
                       protected $phrases: IPhrasesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $detailedPhraseModals: DetailedPhraseModalService,
                       protected $q: IQService) {
        $scope.loadPhrasesCondition = new LoadPhrasesViewModel();
        $scope.loadPhrasesResult = new SearchResultViewModel<PhraseViewModel>();
        $scope.masterItemAvailabilities = MasterItemAvailabilities;

        $scope.shouldPhrasesDisplayed = this._shouldPhrasesDisplayed;
        $scope.clickReloadPhrases = this._clickReloadPhrases;
        $scope.clickAddPhrase = this._clickAddPhrase;
        $scope.clickEditPhrase = this._clickEditPhrase;
        $scope.clickDeletePhrase = this._clickDeletePhrase;
        $scope.clickRestorePhrase = this._clickRestorePhrase;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadPhrases();
    }

    //#endregion

    //#region Internal methods

    protected _shouldPhrasesDisplayed = (): boolean => {
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
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$phrases
            .loadPhrasesAsync(this.$scope.loadPhrasesCondition)
            .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
                this.$scope.loadPhrasesResult = loadPhrasesResult;
            })
            .finally(() => {
                this.$scope.loadingPhrases = false;
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickAddPhrase = (): void => {
        this.$detailedPhraseModals
            .displayAddPhraseModalAsync()
            .then((addPhraseModel: AddPhraseViewModel) => {

                // Display loading screen.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                this.$scope.loadingPhrases = true;

                return this.$phrases
                    .addPhraseAsync(addPhraseModel)
                    .then(() => {
                        return this.$phrases
                            .loadPhrasesAsync(this.$scope.loadPhrasesCondition);
                    })
                    .finally(() => {
                        this.$scope.loadingPhrases = false;
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
                this.$scope.loadPhrasesResult = loadPhrasesResult;
            })
    };

    protected _clickEditPhrase = (phrase: PhraseViewModel): void => {
        this.$detailedPhraseModals
            .displayEditPhraseModalAsync(phrase)
            .then((editPhraseModel: EditPhraseViewModel) => {

                // Display loading screen.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
                this.$scope.loadingPhrases = true;

                return this.$phrases
                    .editPhraseAsync(phrase.id, editPhraseModel)
                    .then(() => {
                        return this.$phrases
                            .loadPhrasesAsync(this.$scope.loadPhrasesCondition);
                    })
                    .finally(() => {
                        this.$scope.loadingPhrases = false;
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
                this.$scope.loadPhrasesResult = loadPhrasesResult;
            });
    };

    protected _clickDeletePhrase = (phrase: PhraseViewModel): void => {
        const translatedTitle = this.$translate.instant('TITLE_DELETE_PHRASE');
        const translatedContent = this.$translate.instant('MSG_DELETE_PHRASE', phrase);
        const translatedSoftDelete = this.$translate.instant('TITLE_SOFT_DELETE');
        const translatedHardDelete = this.$translate.instant('TITLE_HARD_DELETE');
        const translatedCancel = this.$translate.instant('TITLE_CANCEL', phrase);

        const buttons: IModalButton[] = [];

        buttons.push(new ModalButton(() => this.$q.resolve('HARD_DELETE'), translatedHardDelete, {'btn btn-danger': true}));

        if (phrase.availability == MasterItemAvailabilities.available)
            buttons.push(new ModalButton(() => this.$q.resolve('SOFT_DELETE'), translatedSoftDelete, {'btn btn-outline-danger': true}));

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
                this.$scope.loadingPhrases = true;

                return this.$phrases
                    .deletePhraseAsync(phrase.id, mode == 'HARD_DELETE')
                    .then(() => {
                        return this.$phrases
                            .loadPhrasesAsync(this.$scope.loadPhrasesCondition);
                    })
                    .finally(() =>  {
                        this.$scope.loadingPhrases = false;
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
                this.$scope.loadPhrasesResult = loadPhrasesResult;
            });
    };

    protected _clickRestorePhrase = (phrase: PhraseViewModel): void => {
        const translatedTitle = this.$translate.instant('TITLE_RESTORE_PHRASE');
        const translatedMessage = this.$translate.instant('MSG_RESTORE_PHRASE');
        const translatedOk = this.$translate.instant('TITLE_OK');
        const translatedCancel = this.$translate.instant('TITLE_CANCEL');
        const buttons: IModalButton[] = [];

        buttons.push(new ModalButton(this.$q.resolve, translatedOk, {'btn btn-outline-primary': true}));
        buttons.push(new ModalButton(this.$q.reject, translatedCancel, {'btn btn-outline-secondary': true}));

        this.$messageModals
            .displayBasicModalAsync<string>({
                htmlTitle: `<b>${translatedTitle}</b>`,
                htmlContent: `${translatedMessage}`,
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
                this.$scope.loadingPhrases = true;

                const model = new EditPhraseViewModel();
                model.phraseId = phrase.id;
                model.availability = new EditableFieldViewModel<MasterItemAvailabilities>(MasterItemAvailabilities.available, true);

                return this.$phrases
                    .editPhraseAsync(phrase.id, model)
                    .then(() => {
                        return this.$phrases
                            .loadPhrasesAsync(this.$scope.loadPhrasesCondition);
                    })
                    .finally(() =>  {
                        this.$scope.loadingPhrases = false;
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            })
            .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
                this.$scope.loadPhrasesResult = loadPhrasesResult;
            });
    };

    //#endregion
}
