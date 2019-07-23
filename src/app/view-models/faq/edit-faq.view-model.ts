import {EditableFieldViewModel} from "../editable-field.view-model";

export class EditFaqViewModel {

    //#region Properties

    public readonly id: string;

    public category: EditableFieldViewModel<string>;

    public question: EditableFieldViewModel<string>;

    public isHtmlQuestion: EditableFieldViewModel<boolean>;

    public answer: EditableFieldViewModel<string>;

    public isHtmlAnswer: EditableFieldViewModel<boolean>;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        this.id = id;
        this.category= new EditableFieldViewModel<string>();
        this.question = new EditableFieldViewModel<string>();
        this.isHtmlAnswer = new EditableFieldViewModel<boolean>();
        this.answer = new EditableFieldViewModel<string>();
        this.isHtmlAnswer = new EditableFieldViewModel<boolean>();
    }

    //#endregion

}
