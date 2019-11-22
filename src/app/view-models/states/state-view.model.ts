import {BaseEntity} from "../base-entity.view-model";

export class StateViewModel extends BaseEntity {

    //#region Properties

    public name: string;

    public deliveryFee: number;

    //#endregion

    //#region Constructor

    public constructor(id: string) {
        super(id);
    }

    //#endregion
}
