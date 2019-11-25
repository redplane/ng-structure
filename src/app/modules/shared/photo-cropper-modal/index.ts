import {module} from 'angular';
import {PhotoCropperModalService} from "./photo-cropper-modal.service";

import 'cropperjs/dist/cropper.css';

const ngModule = module('ngPhotoCropperModule', ['ui.bootstrap.modal'])
    .service('$photoCropperModals', PhotoCropperModalService);

export default ngModule.name;
