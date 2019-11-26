import {IScope} from "angular";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {CloudDeviceViewModel} from "../../view-models/cloud-device/cloud-device.view-model";
import {LoadCloudDeviceViewModel} from "../../view-models/cloud-device/load-cloud-device.view-model";
import {UserViewModel} from "../../view-models/user/user.view-model";

export interface ICloudDeviceManagementScope extends IScope {

    //#region Properties

    loadCloudDevicesResult: SearchResultViewModel<CloudDeviceViewModel>;

    loadCloudDevicesCondition: LoadCloudDeviceViewModel;

    loadingCloudDevices: boolean;

    idToUser: {[id: string]: UserViewModel};

    //#endregion

    //#region Methods

    shouldCloudDevicesDisplayed(): boolean;

    clickDeleteCloudDevice(cloudDevice: CloudDeviceViewModel): void;

    clickReloadCloudDevices(page?: number): void;

    //#endregion

}
