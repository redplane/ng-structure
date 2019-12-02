import {module} from 'angular';
import {DetailedStateModalService} from "./detailed-state-modal.service";

export default module('ngDetailedStateModalModule', ['ui.bootstrap.modal'])
    .service('$detailedStateModals', DetailedStateModalService)
    .name;
