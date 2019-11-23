import {IScope} from "angular";
import {IModalScope} from "angular-ui-bootstrap";
import Cropper from 'cropperjs/dist/cropper.esm';

export interface IPhotoCropperModalScope extends IScope, IModalScope {

    //#region Properties

    modalId?: string;

    imageCropper: Cropper;

    //#endregion

    //#region Methods

    clickDismissModal: () => void;

    clickOk: () => void;

    //#endregion
}
