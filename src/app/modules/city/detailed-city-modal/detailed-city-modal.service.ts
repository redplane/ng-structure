import {IPromise} from "angular";
import {DetailedCityModalController} from "./detailed-city-modal.controller";
import {AddCityViewModel} from "../../../view-models/city/add-city.view-model";
import {EditCityViewModel} from "../../../view-models/city/edit-city.view-model";
import {CityViewModel} from "../../../view-models/city/city.view-model";

export class DetailedCityModalService {

    //#region Properties

    //#endregion

    //#region Constructor

    public constructor(protected $uibModal: angular.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displayAddCityModalAsync(): IPromise<AddCityViewModel> {
      const modalInstance = this.$uibModal
          .open({
              template: () => require('./detailed-city-modal.html'),
              controller: DetailedCityModalController,
              animation: true,
              backdrop: 'static',
              resolve: {
                  detailedCity: () => null
              }
          });

      return modalInstance
          .result;
    };

    public displayEditCityModalAsync(city: CityViewModel): IPromise<EditCityViewModel> {
        const modalInstance = this.$uibModal
            .open({
                template: () => require('./detailed-city-modal.html'),
                controller: DetailedCityModalController,
                animation: true,
                backdrop: 'static',
                resolve: {
                    detailedCity: () => city
                }
            });

        return modalInstance
            .result;
    }

    //#endregion

}
