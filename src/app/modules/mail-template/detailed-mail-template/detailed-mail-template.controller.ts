import {IController, IPromise} from "angular";
import {MailTemplateViewModel} from "../../../view-models/mail-templates/mail-template.view-model";
import {IDetailedMailTemplateScope} from "./detailed-mail-template.scope";
import {EditorModes} from "../../../enums/edit-modes.enum";
import {IMailTemplatesService} from "../../../services/interfaces/mail-templates-service.interface";

export class DetailedMailTemplateController implements IController {

    //#region Constructor

    public constructor(detailedMailTemplate: MailTemplateViewModel,
                       protected $mailTemplates: IMailTemplatesService,
                       protected $scope: IDetailedMailTemplateScope) {

        $scope.initialDetailedMailTemplate = {...detailedMailTemplate};

        if (detailedMailTemplate) {
            $scope.detailedMailTemplate = {...detailedMailTemplate};
            $scope.editorMode = EditorModes.edit;
        } else {
            $scope.detailedMailTemplate = new MailTemplateViewModel('');
            $scope.editorMode = EditorModes.add;
        }

        $scope.editorModes = EditorModes;

        // Method binding.
        $scope.shouldMailTemplateEditable = this._shouldMailTemplateEditable;
        $scope.shouldAvailableMailTemplateNameDisabled = this._shouldAvailableMailTemplateNameDisabled;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._loadAvailableMailTemplatesAsync();
    }

    //#endregion

    //#region Internal methods

    protected _shouldMailTemplateEditable = (): boolean => {
        const detailedMailTemplate = this.$scope.detailedMailTemplate;
        if (!detailedMailTemplate) {
            return false;
        }

        if (!detailedMailTemplate.id) {
            return false;
        }

        return true;
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

    //#endregion
}
