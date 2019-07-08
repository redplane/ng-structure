import {IController} from "angular";
import {IFaqDetailScope} from "./faq-detail.scope";
import {AddEditFaqViewModel} from "../../../view-models/faq/add-edit-faq.view-model";
import {FaqDetailEditorTabsEnum} from "../../../enums/faq-detail-editor-tabs.enum";

/* @ngInject */
export class FaqDetailController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IFaqDetailScope) {
        this.$scope.htmlEditorOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };

        this.$scope.addEditFaqModel = new AddEditFaqViewModel();
        this.$scope.editorTab = FaqDetailEditorTabsEnum.editor;
        this.$scope.FaqDetailEditorTabsEnum = FaqDetailEditorTabsEnum;

        this.$scope.selectEditorTab = this.selectEditorTab;
    }

    //#endregion

    //#region Methods

    private selectEditorTab = (tab: FaqDetailEditorTabsEnum): void => {
        this.$scope.editorTab = tab;
    }

    //#endregion
}
