import {IController, IPromise, IQService} from "angular";
import {IMailTemplateManagementScope} from "./mail-template-management.scope";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {MailTemplateViewModel} from "../../view-models/mail-templates/mail-template.view-model";
import {LoadMailTemplateViewModel} from "../../view-models/mail-templates/load-mail-template.view-model";
import {IMailTemplatesService} from "../../services/interfaces/mail-templates-service.interface";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";
import {MailTemplateKinds} from "../../enums/mail-template-kinds.enum";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";
import {ModalButton} from "../shared/message-modal/modal-button";
import {EditMailTemplateViewModel} from "../../view-models/mail-templates/edit-mail-template.view-model";
import {EditableFieldViewModel} from "../../view-models/editable-field.view-model";

/* @ngInject */
export class MailTemplateManagementController implements IController {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(protected $scope: IMailTemplateManagementScope,
                       protected $mailTemplates: IMailTemplatesService,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $q: IQService) {

        $scope.loadMailTemplatesResult = new SearchResultViewModel<MailTemplateViewModel>();
        $scope.loadMailTemplatesConditions = new LoadMailTemplateViewModel();
        $scope.loadingMailTemplates = false;
        $scope.masterItemAvailabilities = MasterItemAvailabilities;
        $scope.mailTemplateKinds = MailTemplateKinds;

        $scope.shouldMailTemplatesDisplayed = this._shouldMailTemplatesDisplayed;
        $scope.clickReloadMailTemplates = this._clickReloadMailTemplates;
        $scope.clickDeleteMailTemplate = this._clickDeleteMailTemplate;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadMailTemplates(1);
    }

    protected _shouldMailTemplatesDisplayed = (): boolean => {
        const loadMailTemplatesResult = this.$scope.loadMailTemplatesResult;
        if (!loadMailTemplatesResult) {
            return false;
        }

        const mailTemplates = loadMailTemplatesResult.items;
        if (!mailTemplates || !mailTemplates.length) {
            return false;
        }

        return true;
    };

    protected _clickReloadMailTemplates = (page?: number): void => {

        if (page < 1) {
            page = 1;
        }

        // Display loading screen.
        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$scope.loadMailTemplatesConditions.pager.page = page;
        this._loadReloadMailTemplatesAsync()
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui,
                    MessageEventNameConstant.toggleFullScreenLoader, false);
            });
    };

    protected _clickDeleteMailTemplate = (mailTemplate: MailTemplateViewModel): void => {

        const titleOk = this.$translate.instant('TITLE_OK');
        const titleCancel = this.$translate.instant('TITLE_CANCEL');

        const okButton = new ModalButton(this.$q.resolve, titleOk, {
            'btn btn-outline-danger': true
        });

        const cancelButton = new ModalButton(this.$q.reject, titleCancel, {
            'btn btn-outline-secondary': true
        });

        this.$messageModals
            .displayBasicModalAsync<void>({
                bodyClass: {
                    'text-center': true
                },
                htmlContent: `Are you sure to delete <b class="text-danger">${mailTemplate.name}</b> ?`,
                footerClass: {
                    'justify-content-center': true
                },
                buttons: [okButton, cancelButton]
            })
            .then(() => {

                // Display loading message.
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);

                const editMailTemplateModel = new EditMailTemplateViewModel();
                editMailTemplateModel.availability = new EditableFieldViewModel<MasterItemAvailabilities>(MasterItemAvailabilities.unavailable, true);

                return this.$mailTemplates
                    .editMailTemplateAsync(mailTemplate.id, editMailTemplateModel)
                    .then(() => this._loadReloadMailTemplatesAsync())
                    .finally(() => {
                        this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
                    });
            });
    };

    protected _loadReloadMailTemplatesAsync = (): IPromise<SearchResultViewModel<MailTemplateViewModel>> => {

        // Mark mail templates to be being loaded.
        this.$scope.loadingMailTemplates = true;

        return this.$mailTemplates
            .loadMailTemplatesAsync(this.$scope.loadMailTemplatesConditions)
            .then(loadMailTemplatesResult => this.$scope.loadMailTemplatesResult = loadMailTemplatesResult)
            .finally(() => {
                this.$scope.loadingMailTemplates = false;
            });
    };

    //#endregion

}
