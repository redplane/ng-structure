import {IController} from "angular";
import {IBasicMessageModalOptions} from "./basic-message-modal-option.interface";
import {IMessageModalScope} from "./message-modal.scope";
import {IModalButton} from "./modal-button.interface";

export class MessageModalController implements IController {

    //#region Constructor

    public constructor(initialModalOptions: IBasicMessageModalOptions,
                       protected $scope: IMessageModalScope) {

        // Copy modal options.
        if (!initialModalOptions) {
            initialModalOptions = {
                htmlContent: ''
            };
        }

        const defaultModalHeaderClasses = {
            'modal-header': true
        };

        const defaultModalBodyClasses = {
            'modal-body': true
        };

        const defaultModalFooterClasses = {
            'modal-footer': true
        };

        initialModalOptions.headerClass = {...defaultModalHeaderClasses, ...initialModalOptions.headerClass};
        initialModalOptions.bodyClass = {...defaultModalBodyClasses, ...initialModalOptions.bodyClass};
        initialModalOptions.footerClass = {...defaultModalFooterClasses, ...initialModalOptions.footerClass};
        $scope.modalOptions = {...initialModalOptions};

        $scope.clickCloseModal = this._clickCloseModal;
        $scope.clickModalButton = this._clickModalButton;
    }

    //#endregion

    //#region Internal methods

    protected _clickCloseModal = (): void => {
        this.$scope.$dismiss();
    };

    protected _clickModalButton = (modalButton: IModalButton): void => {

        if (!modalButton) {
            return;
        }

        if (!modalButton.handleClickAction) {
            return;
        }

        modalButton
            .handleClickAction(modalButton)
            .then(data => this.$scope.$close(data))
            .catch(() => this.$scope.$dismiss());
    };

    //#endregion
}
