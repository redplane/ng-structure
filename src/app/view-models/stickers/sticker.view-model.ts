import {BaseEntity} from "../base-entity.view-model";

export class StickerViewModel extends BaseEntity {

    //#region Properties

    public name: string;

    public isDefault: boolean;

    public photoUrl: string;

    //#endregion

}