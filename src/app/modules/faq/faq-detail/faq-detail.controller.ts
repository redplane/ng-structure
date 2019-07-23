import {IController,  INgModelController, INgModelOptions} from "angular";
import {IFaqDetailScope} from "./faq-detail.scope";
import {FaqDetailEditorTabsEnum} from "../../../enums/faq-detail-editor-tabs.enum";
import {FaqViewModel} from "../../../view-models/faq/faq.view-model";
import {AddFaqViewModel} from "../../../view-models/faq/add-faq.view-model";
import {EditFaqViewModel} from "../../../view-models/faq/edit-faq.view-model";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";
import {FaqDetailFormViewModel} from "../../../view-models/faq/faq-detail-form.view-model";

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

        this.$scope.faqModel = new FaqViewModel();

        const faq = this.$scope.$resolve.faq;
        if (faq) {
            this.$scope.inEditMode = true;
            this.$scope.faqModel = faq;
        }


        this.$scope.editorTab = FaqDetailEditorTabsEnum.editor;
        this.$scope.FaqDetailEditorTabsEnum = FaqDetailEditorTabsEnum;

        this.$scope.selectEditorTab = this.selectEditorTab;
        this.$scope.clickCancel = this._clickCancel;
        this.$scope.clickOk = this._clickOk;
    }

    //#endregion

    //#region Methods

    private selectEditorTab = (tab: FaqDetailEditorTabsEnum): void => {
        this.$scope.editorTab = tab;
    };

    /*
    * Called when cancel is clicked.
    * */
    private _clickCancel = (): void => {
        this.$scope.$dismiss();
    };

    /*
    * Called when ok is clicked.
    * */
    private _clickOk = (faqForm: FaqDetailFormViewModel): void => {

        const faqModel = this.$scope.faqModel;

        if (!this.$scope.inEditMode) {
            const addFaqModel: AddFaqViewModel = {
                ...faqModel
            };

            this.$scope.$close(addFaqModel);
        }

        const editFaqModel = new EditFaqViewModel(faqModel.id);

        // Category.
        editFaqModel.category = new EditableFieldViewModel<string>();
        editFaqModel.category.value = faqModel.category;
        editFaqModel.category.hasModified = faqForm.category.$dirty;

        // Question.
        editFaqModel.question = new EditableFieldViewModel<string>();
        editFaqModel.question.value = faqModel.question;
        editFaqModel.question.hasModified = faqForm.question.$dirty;

        // Answer.
        editFaqModel.answer = new EditableFieldViewModel<string>();
        editFaqModel.answer.value = faqModel.answer;
        editFaqModel.answer.hasModified = faqForm.answer.$dirty;

        // Is HTML question.
        editFaqModel.isHtmlQuestion = new EditableFieldViewModel<boolean>();
        editFaqModel.isHtmlQuestion.value = faqModel.isHtmlQuestion;
        editFaqModel.isHtmlQuestion.hasModified = true;

        // Is HTML answer.
        editFaqModel.isHtmlAnswer = new EditableFieldViewModel<boolean>();
        editFaqModel.isHtmlAnswer.value = faqModel.isHtmlAnswer;
        editFaqModel.isHtmlAnswer.hasModified = true;

        this.$scope.$close(editFaqModel);



    };
    //#endregion
}
