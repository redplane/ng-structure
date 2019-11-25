import {module} from 'angular';
import {MessageModalsService} from "./message-modals.service";

export default module('ngMessageModalModule', ['ui.bootstrap.modal'])
    .service('$messageModals', MessageModalsService)
    .name;
