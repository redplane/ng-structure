import {IModalButton} from "./modal-button.interface";

export interface IBasicMessageModalOptions {

    headerClass?: {[key: string]: boolean};

    htmlTitle?: string;

    htmlContent: string;

    bodyClass?: {[key: string]: boolean};

    buttonsWrapperClass?: {[key: string]: boolean};

    buttons?: IModalButton[];
}