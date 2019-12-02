import {module} from 'angular';
import {DateTimePickerModalsService} from "./date-time-picker-modals.service";

require('./date-time-picker-modal.scss');

export default module('ngDateTimePickerModalModule', ['ui.bootstrap.modal', 'ui.bootstrap.datepicker'])
    .service('$dateTimePickerModals', DateTimePickerModalsService)
    .name;
