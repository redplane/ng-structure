import {AddFaqViewModel} from "../../../view-models/faq/add-faq.view-model";
import {FaqDetailEditorTabsEnum} from "../../../enums/faq-detail-editor-tabs.enum";
import {EditFaqViewModel} from "../../../view-models/faq/edit-faq.view-model";
import {FaqViewModel} from "../../../view-models/faq/faq.view-model";

export interface IFaqDetailScope extends ng.ui.bootstrap.IModalScope{

    //#region Properties

    $resolve: {[key: string]: any};

    inEditMode: boolean;

    /*
    * Tiny mce settings.
    * */
    htmlEditorOptions: any;

    /*
    * Model for adding faq.
    * */
    faqModel: FaqViewModel;

    readonly addEditFaqForm: FaqViewModel;

    /*
    * Editor tab.
    * */
    editorTab: FaqDetailEditorTabsEnum;

    /*
    * Enumeration reflection.
    * */
    FaqDetailEditorTabsEnum;

    //#endregion

    //#region Methods

    /*
    * Select editor tab.
    * */
    selectEditorTab(tab: FaqDetailEditorTabsEnum): void;

    /*
    * Called when cancel is clicked.
    * */
    clickCancel(): void;

    /*
    * Called when ok is clicked.
    * */
    clickOk(form): void;

    //#endregion
}
