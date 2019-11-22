import {IPromise} from "angular";

export interface IModalButton {

    buttonClass?: {[key: string]: any};

    htmlContent: string;

    handleClickAction: (modalOptions: IModalButton) => IPromise<any>;
}