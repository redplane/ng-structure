import {module} from 'angular';
import {DetailedCityModalService} from "./detailed-city-modal.service";

export default module('ngDetailedCityModalModule', ['ui.bootstrap.modal'])
    .service('$detailedCityModals', DetailedCityModalService)
    .name;
