import {MasterItemAvailabilities} from "../enums/master-item-availabilities.enum";

export class BaseEntity {

    //#region Properties

    public id: string;

    public availability: MasterItemAvailabilities;

    public createdTime: number;

    public lastModifiedTime: number;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        this.id = id;
    }

    //#endregion

}
