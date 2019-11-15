import {ICoordinate} from "./coordinate.interface";
import {IBank} from "./bank.interface";
import {IAddress} from "./address.interface";

export interface IVendor {

    //#region Properties

    name: string;

    phoneNo: string;

    address: IAddress;

    bank: IBank;

    joinedTime: number;

    //#endregion

}
