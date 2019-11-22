import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export class RatingViewModel {

    //#region Properties

    public id: string;

    public name: string;

    public availability: MasterItemAvailabilities;

    public createdTime: number;

    public lastModifiedTime?: number;

    //#endregion

}