import {IModalButton} from "./modal-button.interface";

export interface IBasicMessageModalOptions {

    headerClass?: {[key: string]: boolean};

    htmlTitle?: string;

    htmlContent: string;

    bodyClass?: {[key: string]: boolean};

    footerClass?: {[key: string]: boolean};

    buttons?: IModalButton[];
}
