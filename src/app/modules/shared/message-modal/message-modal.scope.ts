import {IScope} from "angular";
import {IBasicMessageModalOptions} from "./basic-message-modal-option.interface";
import {IModalButton} from "./modal-button.interface";

export interface IMessageModalScope extends IScope, ng.ui.bootstrap.IModalScope {

    //#region Properties

    modalOptions: IBasicMessageModalOptions;

    //#endregion

    //#region Methods

    clickCloseModal(): void;

    clickModalButton(modalButton: IModalButton): void;

    //#endregion
}