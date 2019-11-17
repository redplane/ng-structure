import {ISettingService} from "../interfaces/settings-service.interface";
import {IAppSettings} from "../../interfaces/app-setting.interface";

export class SettingsService implements ISettingService {

    //#region Constructor

    public constructor(protected appSettings: IAppSettings) {

    }

    //#endregion

    //#region Methods

    public loadMapKey(): string {
        return "";
    }

    //#endregion
}
