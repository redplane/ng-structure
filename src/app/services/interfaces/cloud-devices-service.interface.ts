import {LoadCloudDeviceViewModel} from "../../view-models/cloud-device/load-cloud-device.view-model";
import {IPromise} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {CloudDeviceViewModel} from "../../view-models/cloud-device/cloud-device.view-model";

export interface ICloudDevicesService {

    //#region Methods

    loadCloudDevicesAsync(condition: LoadCloudDeviceViewModel): IPromise<SearchResultViewModel<CloudDeviceViewModel>>;

    deleteCloudDeviceAsync(deviceId: string): IPromise<number>;

    //#endregion
}