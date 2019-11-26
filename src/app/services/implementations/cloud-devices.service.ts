import {ICloudDevicesService} from "../interfaces/cloud-devices-service.interface";
import {IHttpService, IPromise} from "angular";
import {LoadCloudDeviceViewModel} from "../../view-models/cloud-device/load-cloud-device.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {CloudDeviceViewModel} from "../../view-models/cloud-device/cloud-device.view-model";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {DeleteCloudDeviceViewModel} from "../../view-models/cloud-device/delete-cloud-device.view-model";

export class CloudDevicesService implements ICloudDevicesService {

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {

    }

    public loadCloudDevicesAsync(condition: LoadCloudDeviceViewModel): IPromise<SearchResultViewModel<CloudDeviceViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/cloud-device/search`;
        return this.$http
            .post<SearchResultViewModel<CloudDeviceViewModel>>(fullUrl, condition)
            .then(m => m.data);
    }

    public deleteCloudDeviceAsync(deviceId: string): IPromise<number> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/cloud-device/unregister`;
        const model = new DeleteCloudDeviceViewModel();
        model.deviceIds = [deviceId];

        return this.$http
            .put<number>(fullUrl, model)
            .then(m => m.data);
    }

}