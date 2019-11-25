import {IModalButton} from "./modal-button.interface";
import {IPromise} from "angular";

export class ModalButton implements IModalButton {

    handleClickAction: (modalOptions: IModalButton) => IPromise<any>;

    htmlContent: string;

    buttonClass?: {[key: string]: any};

    public constructor(handleClickAction: (modalOptions: IModalButton) => IPromise<any>,
                       htmlContent: string,
                       buttonClass?: {[key: string]: any}) {
        this.handleClickAction = handleClickAction;
        this.htmlContent = htmlContent;
        this.buttonClass = buttonClass;
    }

}