import {ICompileService, IQService, module} from 'angular';
import {PhotoCropperModalService} from "./photo-cropper-modal.service";

import 'cropperjs/dist/cropper.css';

const ngModule = module('ngPhotoCropperModule', ['ui.bootstrap.modal', 'ngCropper'])
    .service('$photoCropperModals', PhotoCropperModalService);

export default ngModule.name;
