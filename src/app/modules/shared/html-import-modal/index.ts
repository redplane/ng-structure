import {module} from 'angular';
import {HtmlImportModalService} from "./html-import-modal.service";

export default module('ngHtmlImportModalModule', ['ui.bootstrap.modal'])
    .service('$htmlImportModals', HtmlImportModalService)
    .name;
