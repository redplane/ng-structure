import {ICoordinate} from "./coordinate.interface";
import {IBank} from "./bank.interface";

export interface IVendor {

    //#region Properties

    cityId: string;

    stateId: string;

    postalCode: string;

    coordinate: ICoordinate;

    bank: IBank;

    auxiliaryAddress: string;

    addressText: string;

    joinedTime: number;

    //#endregion

}