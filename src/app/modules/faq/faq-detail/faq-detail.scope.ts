import {AddEditFaqViewModel} from "../../../view-models/faq/add-edit-faq.view-model";
import {FaqDetailEditorTabsEnum} from "../../../enums/faq-detail-editor-tabs.enum";

export interface IFaqDetailScope {

    //#region Properties

    /*
    * Tiny mce settings.
    * */
    htmlEditorOptions: any;

    /*
    * Model for add | editing faq.
    * */
    addEditFaqModel: AddEditFaqViewModel;

    /*
    * Editor tab.
    * */
    editorTab: FaqDetailEditorTabsEnum;

    FaqDetailEditorTabsEnum;

    //#endregion

    //#region Methods

    /*
    * Select editor tab.
    * */
    selectEditorTab(tab: FaqDetailEditorTabsEnum): void;

    //#endregion
}
