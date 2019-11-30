import {module} from 'angular';
import {LocationPickerModalsService} from "./location-picker-modals.service";

export default module('ngLocationPickerModalModule', ['ui.bootstrap.modal'])
    .service('$locationPickerModals', LocationPickerModalsService)
    .name;
