import {IController, IPromise} from "angular";
import {MailTemplateViewModel} from "../../../view-models/mail-templates/mail-template.view-model";
import {IDetailedMailTemplateScope} from "./detailed-mail-template.scope";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {IMailTemplatesService} from "../../../services/interfaces/mail-templates-service.interface";
import {KeyValueModel} from "../../../models/key-value.model";
import {MasterItemAvailabilities} from "../../../enums/master-item-availabilities.enum";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {EditMailTemplateViewModel} from "../../../view-models/mail-templates/edit-mail-template.view-model";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";
import { StateService } from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {AddMailTemplateViewModel} from "../../../view-models/mail-templates/add-mail-template.view-model";
import {IHtmlImportModalsService} from "../../shared/html-import-modal/html-import-modal-service.interface";

export class DetailedMailTemplateController implements IController {

    //#region Constructor

    public constructor(detailedMailTemplate: MailTemplateViewModel,
                       protected $mailTemplates: IMailTemplatesService,
                       protected $scope: IDetailedMailTemplateScope,
                       protected $messageBus: INgRxMessageBusService,
                       protected $htmlImportModals: IHtmlImportModalsService,
                       protected $state: StateService) {

        $scope.initialDetailedMailTemplate = {...detailedMailTemplate};

        if (detailedMailTemplate) {
            $scope.detailedMailTemplate = {...detailedMailTemplate};
            $scope.editorMode = EditorModes.edit;
        } else {
            $scope.detailedMailTemplate = new MailTemplateViewModel('');
            $scope.editorMode = EditorModes.add;
        }

        $scope.editorModes = EditorModes;

        const availableAvailabilities: KeyValueModel<MasterItemAvailabilities>[] = [];
        availableAvailabilities.push(new KeyValueModel<MasterItemAvailabilities>('TITLE_AVAILABLE', MasterItemAvailabilities.available));
        availableAvailabilities.push(new KeyValueModel<MasterItemAvailabilities>('TITLE_UNAVAILABLE', MasterItemAvailabilities.unavailable));
        $scope.availableAvailabilities = availableAvailabilities;

        // Method binding.
        $scope.shouldMailTemplateEditable = this._shouldMailTemplateEditable;
        $scope.shouldMailTemplateAddable = this._shouldMailTemplateAddable;
        $scope.shouldAvailableMailTemplateNameDisabled = this._shouldAvailableMailTemplateNameDisabled;
        $scope.clickReloadModel = this._clickReloadModel;
        $scope.clickSubmitMailTemplateEdit = this._clickSubmitMailTemplateEdit;
        $scope.clickSubmitMailTemplateAdd = this._clickSubmitMailTemplateAdd;
        $scope.clickImportContent = this._clickImportContent;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._loadAvailableMailTemplatesAsync();
    }

    //#endregion

    //#region Internal methods

    protected _shouldMailTemplateEditable = (): boolean => {
        const initialDetailedMailTemplate = this.$scope.initialDetailedMailTemplate;
        if (!initialDetailedMailTemplate) {
            return false;
        }

        if (!initialDetailedMailTemplate.id) {
            return false;
        }

        return true;
    };

    protected _shouldMailTemplateAddable = (): boolean => {
        const initialDetailedMailTemplate = this.$scope.initialDetailedMailTemplate;
        if (!initialDetailedMailTemplate ) {
            return true;
        }

        if (!initialDetailedMailTemplate.id) {
            return true;
        }

        return false;
    };

    protected _loadAvailableMailTemplatesAsync = (): IPromise<string[]> => {
        return this.$mailTemplates
            .loadAvailableMailTemplatesAsync()
            .then(availableTemplateNames => this.$scope.availableMailTemplateNames = availableTemplateNames);
    };

    protected _shouldAvailableMailTemplateNameDisabled = (): boolean => {
        const availableMailTemplateNames = this.$scope.availableMailTemplateNames;
        return (!availableMailTemplateNames || !availableMailTemplateNames.length);
    };

    protected _clickReloadModel = (): void => {

        if (this.$scope.initialDetailedMailTemplate) {
            this.$scope.detailedMailTemplate = {...this.$scope.initialDetailedMailTemplate};
        } else {
            this.$scope.detailedMailTemplate = new MailTemplateViewModel('');
        }

        this.$scope.detailedMailTemplateForm.name.$setPristine();
        this.$scope.detailedMailTemplateForm.subject.$setPristine();
        this.$scope.detailedMailTemplateForm.content.$setPristine();
        this.$scope.detailedMailTemplateForm.description.$setPristine();
        this.$scope.detailedMailTemplateForm.availability.$setPristine();
        this.$scope.detailedMailTemplateForm.$setPristine();
    };

    protected _clickSubmitMailTemplateEdit = (): void => {

        // Get the form.
        const detailedMailTemplateForm = this.$scope.detailedMailTemplateForm;
        const detailedMailTemplate = this.$scope.detailedMailTemplate;
        const initialMailTemplate = this.$scope.initialDetailedMailTemplate;

        if (!detailedMailTemplateForm || !detailedMailTemplateForm.$valid || !detailedMailTemplateForm.$dirty) {
            return;
        }

        const model = new EditMailTemplateViewModel();
        model.name = new EditableFieldViewModel<string>(detailedMailTemplate.name, detailedMailTemplateForm.name.$dirty);
        model.subject = new EditableFieldViewModel<string>(detailedMailTemplate.subject, detailedMailTemplateForm.subject.$dirty);
        model.description = new EditableFieldViewModel<string>(detailedMailTemplate.description, detailedMailTemplateForm.description.$dirty);
        model.content = new EditableFieldViewModel<string>(detailedMailTemplate.content, detailedMailTemplateForm.content.$dirty);
        model.availability = new EditableFieldViewModel<MasterItemAvailabilities>(detailedMailTemplate.availability, detailedMailTemplateForm.availability.$dirty);

        // Display loading screen.
        this.$messageBus
            .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$mailTemplates
            .editMailTemplateAsync(initialMailTemplate.id, model)
            .then(() => {
                // Redirect to search page,
                return this.$state
                    .go(UrlStatesConstant.mailTemplateModuleName);
            })
            .finally(() => {
                this.$messageBus
                    .addMessage(MessageChannelNameConstant.ui,
                        MessageEventNameConstant.toggleFullScreenLoader, false);
            })
    };

    protected _clickSubmitMailTemplateAdd = (): void => {

        // Get the form.
        const detailedMailTemplateForm = this.$scope.detailedMailTemplateForm;
        const detailedMailTemplate = this.$scope.detailedMailTemplate;

        if (!detailedMailTemplateForm || !detailedMailTemplateForm.$valid || !detailedMailTemplateForm.$dirty) {
            return;
        }

        const model = new AddMailTemplateViewModel();
        model.name = detailedMailTemplate.name;
        model.subject = detailedMailTemplate.subject;
        model.content = detailedMailTemplate.content;
        model.description = detailedMailTemplate.description;
        model.kind = detailedMailTemplate.kind;
        model.availability = detailedMailTemplate.availability;

        this.$messageBus.addMessage(MessageChannelNameConstant.ui,
            MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$mailTemplates
            .addMailTemplateAsync(model)
            .then(() => {
                return this.$state
                    .go(UrlStatesConstant.mailTemplateModuleName);
            })
            .finally(() => {
               this.$messageBus
                   .addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickImportContent = (): void => {
        this.$htmlImportModals
            .displayHtmlImportModalAsync()
            .then(htmlContent => {
                this.$scope.detailedMailTemplate.content = htmlContent;
                this.$scope.detailedMailTemplateForm.content.$setDirty();
                this.$scope.detailedMailTemplateForm.$setDirty();
            });
    };

    //#endregion
}
