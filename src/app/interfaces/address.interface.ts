import {ICoordinate} from "./coordinate.interface";

export interface IAddress {

    //#region Properties

    cityId: string;

    stateId: string;

    postalCode: string;

    coordinate: ICoordinate;

    auxiliaryAddress: string;

    addressText: string;

    //#endregion

}
