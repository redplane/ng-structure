import {IPromise} from "angular";
import {DateTimePickerModalController} from "./date-time-picker-modal.controller";

export class DateTimePickerModalsService {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(protected $uibModal: angular.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayDateTimePickerModalAsync(): IPromise<number | null> {
      const modalInstance = this.$uibModal
          .open({
              template: () => require('./date-time-picker-modal.html'),
              controller: DateTimePickerModalController,
              animation: true
          });

      return modalInstance
          .result;
    };

    //#endregion

}
