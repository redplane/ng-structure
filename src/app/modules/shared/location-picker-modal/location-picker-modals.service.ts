import {LocationPickerModalController} from "./location-picker-modal.controller";
import {IPromise} from "angular";
import {AddAssignedLocationModel} from "../../../models/add-assigned-location.model";
import {ILocationPickerModalsService} from "../../../services/interfaces/location-picker-modals-service.interface";

export class LocationPickerModalsService implements ILocationPickerModalsService {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(protected $uibModal: angular.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayLocationPickerModalAsync(): IPromise<AddAssignedLocationModel> {
      const modalInstance = this.$uibModal
          .open({
              template: () => require('./location-picker-modal.html'),
              controller: LocationPickerModalController,
              animation: true
          });

      return modalInstance
          .result
          .then(addLocationPickerResult => <AddAssignedLocationModel> addLocationPickerResult);
    };

    //#endregion

}
