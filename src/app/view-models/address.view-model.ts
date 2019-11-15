import {IAddress} from "../interfaces/address.interface";
import {ICoordinate} from "../interfaces/coordinate.interface";

export class AddressViewModel implements IAddress {

    addressText: string;

    auxiliaryAddress: string;

    cityId: string;

    cityName: string;

    coordinate: ICoordinate;

    postalCode: string;

    stateId: string;

    stateName: string;

}
