import {HtmlImportModalController} from "./html-import-modal.controller";
import {IPromise} from "angular";
import {IHtmlImportModalsService} from "./html-import-modal-service.interface";

export class HtmlImportModalService implements IHtmlImportModalsService {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(protected $uibModal: angular.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayHtmlImportModalAsync(): IPromise<string> {
      const modalInstance = this.$uibModal
          .open({
              template: () => require('./html-import-modal.html'),
              controller: HtmlImportModalController,
              animation: true,
              size: 'lg'
          });

      return modalInstance
          .result;
    };

    //#endregion

}
