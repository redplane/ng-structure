import {IScope} from "angular";
import {IModalScope} from "angular-ui-bootstrap";
import Cropper from 'cropperjs/dist/cropper.esm';

export interface IPhotoCropperModalScope extends IScope, IModalScope {

    //#region Properties

    modalId?: string;

    fileSelectorId?: string;

    imageCropper: Cropper;

    imageUrl: string;

    //#endregion

    //#region Methods

    clickChangeImage: () => void;

    clickDismissModal: () => void;

    clickOk: () => void;

    selectFile: (event: HTMLInputElement) => void;

    //#endregion
}
