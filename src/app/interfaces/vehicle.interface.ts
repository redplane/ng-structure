import {VehicleTypes} from "../enums/vehicle-types.enum";

export interface IVehicle {

    type: VehicleTypes;

    name: string;

    model: string;

    plateNo: string;
}