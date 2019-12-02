import {LocationPickerModalController} from "./location-picker-modal.controller";
import {IPromise} from "angular";
import {AddAssignedLocationModel} from "../../../models/add-assigned-location.model";
import {ILocationPickerModalsService} from "../../../services/interfaces/location-picker-modals-service.interface";
import {DetailedStateModalController} from "./detailed-state-modal.controller";
import {AddStateViewModel} from "../../../view-models/states/add-state.view-model";
import {StateViewModel} from "../../../view-models/states/state-view.model";
import {EditStateViewModel} from "../../../view-models/states/edit-state.view-model";

export class DetailedStateModalService {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(protected $uibModal: angular.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayAddStateModalAsync(): IPromise<AddStateViewModel> {
      const modalInstance = this.$uibModal
          .open({
              template: () => require('./detailed-state-modal.html'),
              controller: DetailedStateModalController,
              animation: true,
              backdrop: 'static',
              resolve: {
                  detailedState: () => null
              }
          });

      return modalInstance
          .result;
    };

    public displayEditStateModalAsync(state: StateViewModel): IPromise<EditStateViewModel> {
        const modalInstance = this.$uibModal
            .open({
                template: () => require('./detailed-state-modal.html'),
                controller: DetailedStateModalController,
                animation: true,
                backdrop: 'static',
                resolve: {
                    detailedState: () => state
                }
            });

        return modalInstance
            .result;
    }

    //#endregion

}
