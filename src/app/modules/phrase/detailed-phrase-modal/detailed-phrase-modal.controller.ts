import {IController, IQService} from "angular";
import {IDetailedPhraseScope} from "./detailed-phrase-modal.scope";
import {IModalInstanceService} from "angular-ui-bootstrap";
import {KeyValueModel} from "../../../models/key-value.model";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {PhraseViewModel} from "../../../view-models/phrase/phrase.view-model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {EditPhraseViewModel} from "../../../view-models/phrase/edit-phrase.view-model";
import {AddPhraseViewModel} from "../../../view-models/phrase/add-phrase.view-model";

export class DetailedPhraseModalController implements IController {

    //#region Constructor

    public constructor(protected $scope: IDetailedPhraseScope,
                       protected $translate: angular.translate.ITranslateService,
                       protected $uibModalInstance: IModalInstanceService,
                       protected $q: IQService,
                       detailedPhrase: PhraseViewModel) {

        $scope.initialModel = {...detailedPhrase};
        $scope.availableAvailabilities = [
            new KeyValueModel('TITLE_AVAILABLE', MasterItemAvailabilities.available),
            new KeyValueModel('TITLE_UNAVAILABLE', MasterItemAvailabilities.unavailable),
        ];


        if (detailedPhrase && detailedPhrase.id) {
            $scope.text = new EditableFieldViewModel<string>(detailedPhrase.text, false);
            $scope.availability = new EditableFieldViewModel<MasterItemAvailabilities>(detailedPhrase.availability, false);
        } else {
            $scope.text = new EditableFieldViewModel<string>('', false);
            $scope.availability = new EditableFieldViewModel<MasterItemAvailabilities>(MasterItemAvailabilities.available, false);
        }

        $scope.loadModalTitle = this._loadModalTitle;

        $scope.clickDismissModal = this._clickDismissModal;
        $scope.clickAddEditPhrase = this._clickAddEditPhrase;
        $scope.shouldAvailabilitySelectionDisplayed = this._shouldAvailabilitySelectionDisplayed;
    }

    //#endregion

    //#region Methods

    protected _loadModalTitle = (): string => {

        const initialModel = this.$scope.initialModel;
        if (!initialModel || !initialModel.id) {
            return this.$translate.instant('TITLE_ADD_PHRASE');
        }

        return this.$translate.instant('TITLE_EDIT_PHRASE', initialModel);
    };

    protected _clickDismissModal = (): void => {
        this.$uibModalInstance.dismiss();
    };

    protected _clickAddEditPhrase = (): void => {
        const initialModel = this.$scope.initialModel;

        if (initialModel && initialModel.id) {
            const editPhraseModel = new EditPhraseViewModel();
            editPhraseModel.phraseId = this.$scope.initialModel.id;
            editPhraseModel.text = new EditableFieldViewModel<string>(this.$scope.text.value, true);
            editPhraseModel.availability = new EditableFieldViewModel<MasterItemAvailabilities>(this.$scope.availability.value, true);

            this.$uibModalInstance
                .close(editPhraseModel);

            return;
        }

        const addPhraseModel = new AddPhraseViewModel();
        addPhraseModel.text = this.$scope.text.value;

        this.$uibModalInstance
            .close(addPhraseModel);
    };

    protected _shouldAvailabilitySelectionDisplayed = (): boolean => {
        const initialModel = this.$scope.initialModel;
        if (initialModel && initialModel.id) {
            return true;
        }

        return false;
    };


    //#endregion
}
